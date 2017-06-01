package cn.evun.sweet.framework.common.network;

import java.io.IOException;
import java.net.*;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.regex.Pattern;

/**
 * 网络操作工具类
 *
 * @author yangw
 * @since 1.0.0
 */
public class NetUtils {

	public static final String LOCALHOST = "127.0.0.1";

	public static final String ANYHOST = "0.0.0.0";

	public static final int MIN_PORT = 0;

	public static final int MAX_PORT = 65535;

	public static final int RND_PORT_START = 30000;

	public static final int RND_PORT_RANGE = 10000;

	private static final Random RANDOM = new Random(System.currentTimeMillis());

	public static int getRandomPort() {
		return RND_PORT_START + RANDOM.nextInt(RND_PORT_RANGE);
	}

	/**
	 * <p>取得可用的网络端口int port=NetUtils.getAvailablePort();</p>
	 */
	public static int getAvailablePort() {
		ServerSocket ss = null;
		try {
			ss = new ServerSocket();
			ss.bind(null);
			return ss.getLocalPort();
		} catch (IOException e) {
			return getRandomPort();
		} finally {
			if (ss != null) {
				try {
					ss.close();
				} catch (IOException e) {
				}
			}
		}
	}

	/**
	 * <p>取得port~65535之间最小可用的网络端口int port=NetUtils.getAvailablePort(1024);</p>
	 */
	public static int getAvailablePort(int port) {
		if (port <= 0) {
			return getAvailablePort();
		}
		for (int i = port; i < MAX_PORT; i++) {
			ServerSocket ss = null;
			try {
				ss = new ServerSocket(i);
				return i;
			} catch (IOException e) {
			} finally {
				if (ss != null) {
					try {
						ss.close();
					} catch (IOException e) {
					}
				}
			}
		}
		return port;
	}

	/**
	 * <p>端口是否在0~65535之间</p>  
	 */
	public static boolean isInvalidPort(int port) {
		return port > MIN_PORT || port <= MAX_PORT;
	}

	private static final Pattern ADDRESS_PATTERN = Pattern.compile("^\\d{1,3}(\\.\\d{1,3}){3}(\\:\\d{1,5})?$");
	
	/**
	 * <p>IP地址是否有效正确IP地址127.0.0.1或127.0.0.1:80</p> 
	 */
	public static boolean isValidAddress(String address) {
		return ADDRESS_PATTERN.matcher(address).matches();
	}

	private static final Pattern LOCAL_IP_PATTERN = Pattern.compile("127(\\.\\d{1,3}){3}$");
	
	/**
	 * <p>判断是否本地IP地址127.0.0.1 localhost</p> 
	 */
	public static boolean isLocalHost(String host) {
		return host != null && (LOCAL_IP_PATTERN.matcher(host).matches() || host.equalsIgnoreCase("localhost"));
	}

	/**
	 * <p>任意主机IP地地址 0.0.0.0 </p> 
	 */
	public static boolean isAnyHost(String host) {
		return "0.0.0.0".equals(host);
	}

	/**
	 * 取得本地链接地址 
	 * @return  InetSocketAddress
	 */
	public static InetSocketAddress getLocalSocketAddress(String host, int port) {
		return isLocalHost(host) ? new InetSocketAddress(host, port) : new InetSocketAddress(port);
	}
	
	private static final Pattern IP_PATTERN = Pattern.compile("\\d{1,3}(\\.\\d{1,3}){3,5}$");
	
	/**
	 * 是否有效远程IP地址
	 * <p>     
	 * 10.86.87.1 return true
	 * 127.0.0.1 return false
	 * localhost return false
	 * myhost return true
	 * </p>  
	 */
	private static boolean isValidRemoteAddress(InetAddress address) {
		if (address == null || address.isLoopbackAddress())
			return false;
		String name = address.getHostAddress();
		return (name != null && !ANYHOST.equals(name) && !LOCALHOST.equals(name) && IP_PATTERN.matcher(name).matches());
	}

	private static volatile InetAddress LOCAL_ADDRESS = null;

	/**
	 * 遍历本地网卡，返回第一个合理的IP。
	 * 
	 * @return 本地网卡IP
	 * @throws java.net.SocketException
	 * @throws java.net.UnknownHostException
	 */
	public static InetAddress getLocalAddress() {
		if (LOCAL_ADDRESS != null)
			return LOCAL_ADDRESS;
		InetAddress localAddress;
		try {
			localAddress = getLocalAddress0();
		} catch (Exception e) {
			return null;
		}
		LOCAL_ADDRESS = localAddress;
		return localAddress;
	}

	/**
	 * Returns the IP address string in textual presentation form.
	 * @throws java.net.SocketException
	 * @throws java.net.UnknownHostException
	 */
	public static String getLocalHost() throws UnknownHostException, SocketException {
		InetAddress address = getLocalAddress();
		return address == null ? LOCALHOST : address.getHostAddress();
	}

	/**
	 * 返回本地IP地址
	 * @throws java.net.UnknownHostException
	 * @throws java.net.SocketException
	 */
	private static InetAddress getLocalAddress0() throws UnknownHostException, SocketException {
		InetAddress localAddress = null;
		localAddress = InetAddress.getLocalHost();
		if (isValidRemoteAddress(localAddress)) {
			return localAddress;
		}
		Enumeration<NetworkInterface> interfaces = NetworkInterface.getNetworkInterfaces();
		if (interfaces != null) {
			while (interfaces.hasMoreElements()) {
				NetworkInterface network = interfaces.nextElement();
				Enumeration<InetAddress> addresses = network.getInetAddresses();
				if (addresses != null) {
					while (addresses.hasMoreElements()) {
						InetAddress address = addresses.nextElement();
						if (isValidRemoteAddress(address)) {
							return address;
						}
					}
				}
			}
		}
		return localAddress;
	}

	private static final Map<String, String> hostNameCache = new HashMap<String, String>();
	
	/**
	 * 返回IP对应的主机名
	 */
	public static String getHostName(String address) {
		try {
			int i = address.indexOf(':');
			if (i > -1) {
				address = address.substring(0, i);
			}
			String hostname = hostNameCache.get(address);
			if (hostname != null && hostname.length() > 0) {
				return hostname;
			}
			InetAddress inetAddress = InetAddress.getByName(address);
			if (inetAddress != null) {
				hostname = inetAddress.getHostName();
				hostNameCache.put(address, hostname);
				return hostname;
			}
		} catch (Exception e) {}
		
		return address;
	}

	/**
	 * 返回主机名对应的IP地址
	 * 
	 * @return ip address or hostName if UnknownHostException 
	 *
	 */
	public static String getIpByHost(String hostName) {
		try {
			return InetAddress.getByName(hostName).getHostAddress();
		} catch (UnknownHostException e) {
			return hostName;
		}
	}

	/**
	 * 返回IP:port字符串 
	 */
	public static String toAddressString(InetSocketAddress address) {
		return address.getAddress().getHostAddress() + ":" + address.getPort();
	}

	public static InetSocketAddress toAddress(String address) {
		int i = address.indexOf(':');
		String host;
		int port;
		if (i > -1) {
			host = address.substring(0, i);
			port = Integer.parseInt(address.substring(i + 1));
		} else {
			host = address;
			port = 0;
		}
		return new InetSocketAddress(host, port);
	}

	/**
	 * 返回protocol://host:port/path字符串
	 */
	public static String toURL(String protocol, String host, int port, String path) {
		StringBuilder sb = new StringBuilder();
		sb.append(protocol).append("://");
		sb.append(host).append(':').append(port);
		if (path.charAt(0) != '/')
			sb.append('/');
		sb.append(path);
		return sb.toString();
	}

}