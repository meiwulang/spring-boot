package cn.evun.sweet.framework.common.network.http;

import org.apache.http.Consts;
import org.apache.http.Header;
import org.apache.http.HttpHost;
import org.apache.http.HttpStatus;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

public class HttpClientUtil {
	private static CloseableHttpClient client = null;
	private static int TIME_OUT = 20000;

    private final static String USER_AGENT
            = "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; InfoPath.3)";
	private static CloseableHttpClient getClient() {
		if (client == null) {
			synchronized (HttpClientUtil.class) {
				if (client == null) {
					PoolingHttpClientConnectionManager cm =  new PoolingHttpClientConnectionManager();
					cm.setMaxTotal(200);
					cm.setDefaultMaxPerRoute(20);
					client = HttpClients.custom().setUserAgent(USER_AGENT)
                            .setConnectionManager(cm)
                            .disableAutomaticRetries()
                            .build();
				}
			}
		}
		return client;
	}
	
	public static void close() {
		if (client != null) {
			try {
				client.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

    public static void setTimeOut(int timeOut) {
        HttpClientUtil.TIME_OUT = timeOut;
    }
    public static void setCloseableHttpClient(CloseableHttpClient client) {
        HttpClientUtil.client = client;
    }

	public static String doHttpPageRequest(String url) throws HttpVisitException {
		return doHttpPageRequest(url, null, null);
	}

	public static String doHttpPageRequest(String url,
			Map<String, String> params) throws HttpVisitException {
		return doHttpPageRequest(url, params, null);
	}
	
	public static String doHttpPageRequest(String url,
			Map<String, String> params, HttpHost host) throws HttpVisitException {
		HttpGet httpGet = new HttpGet(url);
		if (params != null && !params.isEmpty()) {
			for (Entry<String, String> entry : params.entrySet()) {
				httpGet.setHeader(entry.getKey(), entry.getValue());
			}
		}
		RequestConfig config = RequestConfig.custom().setConnectionRequestTimeout(TIME_OUT).setSocketTimeout(TIME_OUT)
				.setConnectTimeout(TIME_OUT).setProxy(host).build();
		httpGet.setConfig(config);
//		httpGet.addHeader("Content-Type", "text/html;charset=UTF-8");
		try {
			CloseableHttpResponse response = getClient().execute(httpGet);
			try 
			{
				if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) 
				{
					return EntityUtils.toString(response.getEntity());
				} else {
					throw new HttpVisitException(response.getStatusLine().toString()+" for url: "+url);
				}
			}
			finally
			{
				response.close();
			}
		} catch (IOException e) {
			throw new HttpVisitException("doHttpPageRequest failed", e);
		}
	}
	
	public static byte[] getImgByte(String url) throws HttpVisitException
	{
		HttpGet httpGet = new HttpGet(url);
		RequestConfig config = RequestConfig.custom().setConnectionRequestTimeout(TIME_OUT).setSocketTimeout(TIME_OUT)
				.setConnectTimeout(TIME_OUT).setRedirectsEnabled(false).build();
		httpGet.setConfig(config);
		try {
			CloseableHttpResponse response = getClient().execute(httpGet);
			try
			{
				if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK)
				{
					return EntityUtils.toByteArray(response.getEntity());
				}
				else
				{
					throw new HttpVisitException(response.getStatusLine().toString());
				}
			}
			finally
			{
				response.close();
			}
		} 
		catch (IOException e) 
		{
			throw new HttpVisitException("getImgByte failed", e);
		} 
	}
	
	private static String getRedirectUrl(CloseableHttpResponse response) throws IOException{
		Header head = response.getFirstHeader("Location");
		response.close();
		if (head == null) {
			
			return null;
		} else {
			return head.getValue();
		}
	}
	
	/**
	 * 获取最终的重定向地址
	 * @param url 原始URL
	 * @return 最终地址
	 * @throws HttpVisitException 重定向超过10次
	 */
	public static String getFinalRedirectLocation(String url)
			throws HttpVisitException {
		HttpGet httpGet = new HttpGet(url);
		RequestConfig config = RequestConfig.custom().setConnectionRequestTimeout(TIME_OUT).setSocketTimeout(TIME_OUT)
				.setConnectTimeout(TIME_OUT).setRedirectsEnabled(false).build();
		httpGet.setConfig(config);
		try {
			CloseableHttpResponse response = getClient().execute(httpGet);
			if (response.getStatusLine().getStatusCode() == HttpStatus.SC_MOVED_TEMPORARILY) {
				String redirectUrl = getRedirectUrl(response);
				int cnt = 0;
				do {
					cnt++;
					httpGet.setURI(URI.create(redirectUrl));
					response = getClient().execute(httpGet);
					if (response.getStatusLine().getStatusCode() != HttpStatus.SC_MOVED_TEMPORARILY) {
						response.close();
						return redirectUrl;
					} else {
						redirectUrl = getRedirectUrl(response);
					}
					
					if (cnt == 10)
					{
						throw new HttpVisitException("redirect too much");
					}
				} while (true);
			} else {
				response.close();
				return url;
			}
		} catch (IOException e) {
			throw new HttpVisitException(e);
		}
	}

	public static String doPostRequest(String url, String key, String jsonData) throws HttpVisitException
	{
		Map<String, String> fromData = new HashMap<String,String>();
		fromData.put(key, jsonData);
		return doPostRequest(url,fromData,null,null);
	}
	
	public static String doPostRequest(String url, Map<String, String> fromData) throws HttpVisitException
	{
		return doPostRequest(url,fromData,null,null);
	}
	
	public static String doPostRequest(String url, Map<String, String> fromData,
			Map<String, String> headers, HttpHost proxy) throws HttpVisitException
	{
		HttpPost post = new HttpPost(url);
		if (headers != null && !headers.isEmpty()) {
			for (Entry<String, String> entry : headers.entrySet()) {
				post.setHeader(entry.getKey(), entry.getValue());
			}
		}
		RequestConfig config = RequestConfig.custom().setConnectionRequestTimeout(TIME_OUT).setSocketTimeout(TIME_OUT)
				.setConnectTimeout(TIME_OUT).setProxy(proxy).build();
		post.setConfig(config);
		
		List<BasicNameValuePair> formparams = new ArrayList<BasicNameValuePair>();
		for (Entry<String, String> enty : fromData.entrySet())
		{
			formparams.add(new BasicNameValuePair(enty.getKey(), enty.getValue()));
		}
		UrlEncodedFormEntity entity = new UrlEncodedFormEntity(formparams, Consts.UTF_8);
		post.setEntity(entity);
		
		try {
			CloseableHttpResponse response = getClient().execute(post);
			try 
			{
				if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) 
				{
					return EntityUtils.toString(response.getEntity());
				} else {
					throw new HttpVisitException(response.getStatusLine().toString());
				}
			}
			finally
			{
				response.close();
			}
		} catch (IOException e) {
			throw new HttpVisitException("doHttpPostRequest failed", e);
		}
	}

    @Deprecated // TODO
	public static String doJsonReturnedRequest(String url,
			Map<String, String> params) throws HttpVisitException {
		throw new HttpVisitException("Method not implemented");
	}

    @Deprecated // TODO
	public static String doJsonpRequest(String url, Map<String, String> params)
			throws HttpVisitException {
        throw new HttpVisitException("Method not implemented");
	}
	
	public static void main(String[] args) throws Exception {
		//https://store.taobao.com/shop/view_shop.htm?user_number_id=253285776
		System.out.println(getFinalRedirectLocation("http://image5.suning.cn/b2c/catentries/000000000137145205_3_400x400.jpg"));
		FileOutputStream pr = new FileOutputStream("d:\\test2.jpg");
		pr.write(getImgByte("http://image5.suning.cn/b2c/catentries/000000000137145205_3.jpg"));
		pr.close();

	}
	
}
