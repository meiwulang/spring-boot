package cn.evun.sweet.framework.common.web;

import cn.evun.sweet.framework.common.util.Assert;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * cookie操作工具。
 *
 * @author yangw
 * @since 1.0.0
 */
@Deprecated
public class CookieHelper {

	/**
	 * Default path that cookies will be visible to: "/", i.e. the entire server.
	 */
	public static final String DEFAULT_COOKIE_PATH = "/";

	private String cookieName;

	private String cookieDomain;

	private String cookiePath = DEFAULT_COOKIE_PATH;

	private Integer cookieMaxAge = null;

	private boolean cookieSecure = false;

	private boolean cookieHttpOnly = false;


	/**
	 * Use the given name for cookies created by this helper.
	 * @see javax.servlet.http.Cookie#getName()
	 */
	public void setCookieName(String cookieName) {
		this.cookieName = cookieName;
	}

	/**
	 * Return the given name for cookies created by this helper.
	 */
	public String getCookieName() {
		return this.cookieName;
	}

	/**
	 * Use the given domain for cookies created by this helper.
	 * The cookie is only visible to servers in this domain.
	 * @see javax.servlet.http.Cookie#setDomain
	 */
	public void setCookieDomain(String cookieDomain) {
		this.cookieDomain = cookieDomain;
	}

	/**
	 * Return the domain for cookies created by this helper, if any.
	 */
	public String getCookieDomain() {
		return this.cookieDomain;
	}

	/**
	 * Use the given path for cookies created by this helper.
	 * The cookie is only visible to URLs in this path and below.
	 * @see javax.servlet.http.Cookie#setPath
	 */
	public void setCookiePath(String cookiePath) {
		this.cookiePath = cookiePath;
	}

	/**
	 * Return the path for cookies created by this helper.
	 */
	public String getCookiePath() {
		return this.cookiePath;
	}

	/**
	 * Use the given maximum age (in seconds) for cookies created by this helper.
	 * Useful special value: -1 ... not persistent, deleted when client shuts down
	 * @see javax.servlet.http.Cookie#setMaxAge
	 */
	public void setCookieMaxAge(Integer cookieMaxAge) {
		this.cookieMaxAge = cookieMaxAge;
	}

	/**
	 * Return the maximum age for cookies created by this helper.
	 */
	public Integer getCookieMaxAge() {
		return this.cookieMaxAge;
	}

	/**
	 * Set whether the cookie should only be sent using a secure protocol,
	 * such as HTTPS (SSL). This is an indication to the receiving browser,
	 * not processed by the HTTP server itself. Default is "false".
	 * @see javax.servlet.http.Cookie#setSecure
	 */
	public void setCookieSecure(boolean cookieSecure) {
		this.cookieSecure = cookieSecure;
	}

	/**
	 * Return whether the cookie should only be sent using a secure protocol,
	 * such as HTTPS (SSL).
	 */
	public boolean isCookieSecure() {
		return this.cookieSecure;
	}

	/**
	 * Set whether the cookie is supposed to be marked with the "HttpOnly" attribute.
	 * <p>Note that this feature is only available on Servlet 3.0 and higher.
	 * @see javax.servlet.http.Cookie#setHttpOnly
	 */
	public void setCookieHttpOnly(boolean cookieHttpOnly) {
		this.cookieHttpOnly = cookieHttpOnly;
	}

	/**
	 * Return whether the cookie is supposed to be marked with the "HttpOnly" attribute.
	 */
	public boolean isCookieHttpOnly() {
		return this.cookieHttpOnly;
	}


	/**
	 * Add a cookie with the given value to the response,
	 * using the cookie descriptor settings of this helper.
	 * <p>Delegates to {@link #createCookie} for cookie creation.
	 * @param response the HTTP response to add the cookie to
	 * @param cookieValue the value of the cookie to add
	 */
	public void addCookie(HttpServletResponse response, String cookieValue) {
		Assert.notNull(response, "HttpServletResponse must not be null");
		Cookie cookie = createCookie(cookieValue);
		Integer maxAge = getCookieMaxAge();
		if (maxAge != null) {
			cookie.setMaxAge(maxAge);
		}
		if (isCookieSecure()) {
			cookie.setSecure(true);
		}
		if (isCookieHttpOnly()) {
			cookie.setHttpOnly(true);
		}
		response.addCookie(cookie);
	}

	/**
	 * Remove the cookie that this helper describes from the response.
	 * Will generate a cookie with empty value and max age 0.
	 * <p>Delegates to {@link #createCookie} for cookie creation.
	 * @param response the HTTP response to remove the cookie from
	 */
	public void removeCookie(HttpServletResponse response) {
		Assert.notNull(response, "HttpServletResponse must not be null");
		Cookie cookie = createCookie("");//内容清空
		cookie.setMaxAge(0);//如果0，就说明立即删除
		response.addCookie(cookie);
	}

	/**
	 * Create a cookie with the given value, using the cookie descriptor
	 * settings of this helper (except for "cookieMaxAge").
	 * @param cookieValue the value of the cookie to crate
	 */
	protected Cookie createCookie(String cookieValue) {
		Cookie cookie = new Cookie(getCookieName(), cookieValue);
		if (getCookieDomain() != null) {
			cookie.setDomain(getCookieDomain());
		}
		cookie.setPath(getCookiePath());
		return cookie;
	}
	
	/**
	 * 根据cookie的key获取cookie
	 */
	public static Cookie getCookie(HttpServletRequest request, String cookieName) {
		Cookie[] cookies = request.getCookies();
		if (cookies != null) {
			for (int i = 0; i < cookies.length; i++) {
				if (cookieName.equals(cookies[i].getName())) {
					return cookies[i];
				}
			}
		}
		return null;
	}
	
	/**
	 * 根据cookie的key获取value
	 */
	public static String getCookieValue(HttpServletRequest request, String cookieName) {
		if (cookieName != null) {  
            Cookie cookie = getCookie(request, cookieName);  
            if(cookie!=null){  
                return cookie.getValue();  
            }  
        }  
        return "";
	}
	
	/**
	 * 删除一个指定名称的cooike
	 */
	 public boolean deleteCookie(HttpServletRequest request, HttpServletResponse response, String cookieName) {  
        if (cookieName != null) {  
            Cookie cookie = getCookie(request, cookieName);  
            if(cookie!=null){  
                cookie.setMaxAge(0);//如果0，就说明立即删除  
                response.addCookie(cookie);  
                return true;  
            }  
        }  
        return false;  
    }  
}



