package cn.evun.sweet.framework.common.web;

import java.util.HashMap;
import java.util.Map;

/**
 *<p>根据文件后缀查找对应的MIME类型</p>
 *
 * @author yangw
 * @since 1.0.0
 */
public final class MIMEMaper {
	
	public static final Map<String, String> MimeMap = new HashMap<String, String>(); 
	
	static {		
		MimeMap.put("docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");   
		MimeMap.put("xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");   
		MimeMap.put("pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation");
		MimeMap.put("ppsx", " application/vnd.openxmlformats-officedocument.presentationml.slideshow");
		MimeMap.put("mdbx", "application/msaccess");
		MimeMap.put("001	".trim(), "application/x-001	                      ".trim());   MimeMap.put("301	".trim(), "application/x-301                   ".trim());
		MimeMap.put("323	".trim(), "text/h323	                              ".trim());   MimeMap.put("906	".trim(), "application/x-906                   ".trim());
		MimeMap.put("907	".trim(), "drawing/907	                              ".trim());   MimeMap.put("a11	".trim(), "application/x-a11                   ".trim());
		MimeMap.put("acp	".trim(), "audio/x-mei-aac	                          ".trim());   MimeMap.put("ai	".trim(), "application/postscript              ".trim());
		MimeMap.put("aif	".trim(), "audio/aiff	                              ".trim());   MimeMap.put("aifc".trim(), "audio/aiff                          ".trim());
		MimeMap.put("aiff	".trim(), "audio/aiff	                              ".trim());   MimeMap.put("anv	".trim(), "application/x-anv                   ".trim());
		MimeMap.put("asa	".trim(), "text/asa	                                  ".trim());   MimeMap.put("asf	".trim(), "video/x-ms-asf                      ".trim());
		MimeMap.put("asp	".trim(), "text/asp	                                  ".trim());   MimeMap.put("asx	".trim(), "video/x-ms-asf                      ".trim());
		MimeMap.put("au	    ".trim(), "audio/basic	                              ".trim());   MimeMap.put("avi	".trim(), "video/avi                           ".trim());
		MimeMap.put("awf	".trim(), "application/vnd.adobe.workflow	          ".trim());   MimeMap.put("biz	".trim(), "text/xml                            ".trim());
		MimeMap.put("bmp	".trim(), "application/x-bmp	                      ".trim());   MimeMap.put("bot	".trim(), "application/x-bot                   ".trim());
		MimeMap.put("c4t	".trim(), "application/x-c4t	                      ".trim());   MimeMap.put("c90	".trim(), "application/x-c90                   ".trim());
		MimeMap.put("cal	".trim(), "application/x-cals	                      ".trim());   MimeMap.put("cat	".trim(), "application/vnd.ms-pki.seccat       ".trim());
		MimeMap.put("cdf	".trim(), "application/x-netcdf	                      ".trim());   MimeMap.put("cdr	".trim(), "application/x-cdr                   ".trim());
		MimeMap.put("cel	".trim(), "application/x-cel	                      ".trim());   MimeMap.put("cer	".trim(), "application/x-x509-ca-cert          ".trim());
		MimeMap.put("cg4	".trim(), "application/x-g4	                          ".trim());   MimeMap.put("cgm	".trim(), "application/x-cgm                   ".trim());
		MimeMap.put("cit	".trim(), "application/x-cit	                      ".trim());   MimeMap.put("clas".trim(), "java/*                              ".trim());
		MimeMap.put("cml	".trim(), "text/xml	                                  ".trim());   MimeMap.put("cmp	".trim(), "application/x-cmp                   ".trim());
		MimeMap.put("cmx	".trim(), "application/x-cmx	                      ".trim());   MimeMap.put("cot	".trim(), "application/x-cot                   ".trim());
		MimeMap.put("crl	".trim(), "application/pkix-crl	                      ".trim());   MimeMap.put("crt	".trim(), "application/x-x509-ca-cert          ".trim());
		MimeMap.put("csi	".trim(), "application/x-csi	                      ".trim());   MimeMap.put("css	".trim(), "text/css                            ".trim());
		MimeMap.put("cut	".trim(), "application/x-cut	                      ".trim());   MimeMap.put("dbf	".trim(), "application/x-dbf                   ".trim());
		MimeMap.put("dbm	".trim(), "application/x-dbm	                      ".trim());   MimeMap.put("dbx	".trim(), "application/x-dbx                   ".trim());
		MimeMap.put("dcd	".trim(), "text/xml	                                  ".trim());   MimeMap.put("dcx	".trim(), "application/x-dcx                   ".trim());
		MimeMap.put("der	".trim(), "application/x-x509-ca-cert	              ".trim());   MimeMap.put("dgn	".trim(), "application/x-dgn                   ".trim());
		MimeMap.put("dib	".trim(), "application/x-dib	                      ".trim());   MimeMap.put("dll	".trim(), "application/x-msdownload            ".trim());
		MimeMap.put("doc	".trim(), "application/msword	                      ".trim());   MimeMap.put("dot	".trim(), "application/msword                  ".trim());
		MimeMap.put("drw	".trim(), "application/x-drw	                      ".trim());   MimeMap.put("dtd	".trim(), "text/xml                            ".trim());
		MimeMap.put("dwf	".trim(), "Model/vnd.dwf	                          ".trim());   MimeMap.put("dwf	".trim(), "application/x-dwf                   ".trim());
		MimeMap.put("dwg	".trim(), "application/x-dwg	                      ".trim());   MimeMap.put("dxb	".trim(), "application/x-dxb                   ".trim());
		MimeMap.put("dxf	".trim(), "application/x-dxf	                      ".trim());   MimeMap.put("edn	".trim(), "application/vnd.adobe.edn           ".trim());
		MimeMap.put("emf	".trim(), "application/x-emf	                      ".trim());   MimeMap.put("eml	".trim(), "message/rfc822                      ".trim());
		MimeMap.put("ent	".trim(), "text/xml	                                  ".trim());   MimeMap.put("epi	".trim(), "application/x-epi                   ".trim());
		MimeMap.put("eps	".trim(), "application/x-ps	                          ".trim());   MimeMap.put("eps	".trim(), "application/postscript              ".trim());
		MimeMap.put("etd	".trim(), "application/x-ebx	                      ".trim());   MimeMap.put("exe	".trim(), "application/x-msdownload            ".trim());
		MimeMap.put("fax	".trim(), "image/fax	                              ".trim());   MimeMap.put("fdf	".trim(), "application/vnd.fdf                 ".trim());
		MimeMap.put("fif	".trim(), "application/fractals	                      ".trim());   MimeMap.put("fo	".trim(), "text/xml                            ".trim());
		MimeMap.put("frm	".trim(), "application/x-frm	                      ".trim());   MimeMap.put("g4	".trim(), "application/x-g4                    ".trim());
		MimeMap.put("gbr	".trim(), "application/x-gbr	                      ".trim());   MimeMap.put("	".trim(), "application/x-                      ".trim());
		MimeMap.put("gif	".trim(), "image/gif	                              ".trim());   MimeMap.put("gl2	".trim(), "application/x-gl2                   ".trim());
		MimeMap.put("gp4	".trim(), "application/x-gp4	                      ".trim());   MimeMap.put("hgl	".trim(), "application/x-hgl                   ".trim());
		MimeMap.put("hmr	".trim(), "application/x-hmr	                      ".trim());   MimeMap.put("hpg	".trim(), "application/x-hpgl                  ".trim());
		MimeMap.put("hpl	".trim(), "application/x-hpl	                      ".trim());   MimeMap.put("hqx	".trim(), "application/mac-binhex40            ".trim());
		MimeMap.put("hrf	".trim(), "application/x-hrf	                      ".trim());   MimeMap.put("hta	".trim(), "application/hta                     ".trim());
		MimeMap.put("htc	".trim(), "text/x-component	                          ".trim());   MimeMap.put("htm	".trim(), "text/html                           ".trim());
		MimeMap.put("html	".trim(), "text/html	                              ".trim());   MimeMap.put("htt	".trim(), "text/webviewhtml                    ".trim());
		MimeMap.put("htx	".trim(), "text/html	                              ".trim());   MimeMap.put("icb	".trim(), "application/x-icb                   ".trim());
		MimeMap.put("ico	".trim(), "image/x-icon	                              ".trim());   MimeMap.put("ico	".trim(), "application/x-ico                   ".trim());
		MimeMap.put("iff	".trim(), "application/x-iff	                      ".trim());   MimeMap.put("ig4	".trim(), "application/x-g4                    ".trim());
		MimeMap.put("igs	".trim(), "application/x-igs	                      ".trim());   MimeMap.put("iii	".trim(), "application/x-iphone                ".trim());
		MimeMap.put("img	".trim(), "application/x-img	                      ".trim());   MimeMap.put("ins	".trim(), "application/x-internet-signup       ".trim());
		MimeMap.put("isp	".trim(), "application/x-internet-signup	          ".trim());   MimeMap.put("IVF	".trim(), "video/x-ivf                         ".trim());
		MimeMap.put("java	".trim(), "java/*	                                  ".trim());   MimeMap.put("jfif".trim(), "image/jpeg                          ".trim());
		MimeMap.put("jpe	".trim(), "image/jpeg	                              ".trim());   MimeMap.put("jpe	".trim(), "application/x-jpe                   ".trim());
		MimeMap.put("jpeg	".trim(), "image/jpeg	                              ".trim());   MimeMap.put("jpg	".trim(), "image/jpeg                          ".trim());
		MimeMap.put("jpg	".trim(), "application/x-jpg	                      ".trim());   MimeMap.put("js	".trim(), "application/x-javascript            ".trim());
		MimeMap.put("jsp	".trim(), "text/html	                              ".trim());   MimeMap.put("la1	".trim(), "audio/x-liquid-file                 ".trim());
		MimeMap.put("lar	".trim(), "application/x-laplayer-reg	              ".trim());   MimeMap.put("latex".trim(), "application/x-latex                 ".trim());
		MimeMap.put("lavs	".trim(), "audio/x-liquid-secure	                  ".trim());   MimeMap.put("lbm	".trim(), "application/x-lbm                   ".trim());
		MimeMap.put("lmsff	".trim(), "audio/x-la-lms	                          ".trim());   MimeMap.put("ls	".trim(), "application/x-javascript            ".trim());
		MimeMap.put("ltr	".trim(), "application/x-ltr	                      ".trim());   MimeMap.put("m1v	".trim(), "video/x-mpeg                        ".trim());
		MimeMap.put("m2v	".trim(), "video/x-mpeg	                              ".trim());   MimeMap.put("m3u	".trim(), "audio/mpegurl                       ".trim());
		MimeMap.put("m4e	".trim(), "video/mpeg4	                              ".trim());   MimeMap.put("mac	".trim(), "application/x-mac                   ".trim());
		MimeMap.put("man	".trim(), "application/x-troff-man	                  ".trim());   MimeMap.put("math".trim(), "text/xml                            ".trim());
		MimeMap.put("mdb	".trim(), "application/msaccess	                      ".trim());   MimeMap.put("mdb	".trim(), "application/x-mdb                   ".trim());
		MimeMap.put("mfp	".trim(), "application/x-shockwave-flash	          ".trim());   MimeMap.put("mht	".trim(), "message/rfc822                      ".trim());
		MimeMap.put("mhtml	".trim(), "message/rfc822	                          ".trim());   MimeMap.put("mi	".trim(), "application/x-mi                    ".trim());
		MimeMap.put("mid	".trim(), "audio/mid	                              ".trim());   MimeMap.put("midi".trim(), "audio/mid                           ".trim());
		MimeMap.put("mil	".trim(), "application/x-mil	                      ".trim());   MimeMap.put("mml	".trim(), "text/xml                            ".trim());
		MimeMap.put("mnd	".trim(), "audio/x-musicnet-download	              ".trim());   MimeMap.put("mns	".trim(), "audio/x-musicnet-stream             ".trim());
		MimeMap.put("mocha	".trim(), "application/x-javascript	                  ".trim());   MimeMap.put("movie".trim(), "video/x-sgi-movie                   ".trim());
		MimeMap.put("mp1	".trim(), "audio/mp1	                              ".trim());   MimeMap.put("mp2	".trim(), "audio/mp2                           ".trim());
		MimeMap.put("mp2v	".trim(), "video/mpeg	                              ".trim());   MimeMap.put("mp3	".trim(), "audio/mp3                           ".trim());
		MimeMap.put("mp4	".trim(), "video/mpeg4	                              ".trim());   MimeMap.put("mpa	".trim(), "video/x-mpg                         ".trim());
		MimeMap.put("mpd	".trim(), "application/vnd.ms-project	              ".trim());   MimeMap.put("mpe	".trim(), "video/x-mpeg                        ".trim());
		MimeMap.put("mpeg	".trim(), "video/mpg	                              ".trim());   MimeMap.put("mpg	".trim(), "video/mpg                           ".trim());
		MimeMap.put("mpga	".trim(), "audio/rn-mpeg	                          ".trim());   MimeMap.put("mpp	".trim(), "application/vnd.ms-project          ".trim());
		MimeMap.put("mps	".trim(), "video/x-mpeg	                              ".trim());   MimeMap.put("mpt	".trim(), "application/vnd.ms-project          ".trim());
		MimeMap.put("mpv	".trim(), "video/mpg	                              ".trim());   MimeMap.put("mpv2".trim(), "video/mpeg                          ".trim());
		MimeMap.put("mpw	".trim(), "application/vnd.ms-project	              ".trim());   MimeMap.put("mpx	".trim(), "application/vnd.ms-project          ".trim());
		MimeMap.put("mtx	".trim(), "text/xml	                                  ".trim());   MimeMap.put("mxp	".trim(), "application/x-mmxp                  ".trim());
		MimeMap.put("net	".trim(), "image/pnetvue	                          ".trim());   MimeMap.put("nrf	".trim(), "application/x-nrf                   ".trim());
		MimeMap.put("nws	".trim(), "message/rfc822	                          ".trim());   MimeMap.put("odc	".trim(), "text/x-ms-odc                       ".trim());
		MimeMap.put("out	".trim(), "application/x-out	                      ".trim());   MimeMap.put("p10	".trim(), "application/pkcs10                  ".trim());
		MimeMap.put("p12	".trim(), "application/x-pkcs12	                      ".trim());   MimeMap.put("p7b	".trim(), "application/x-pkcs7-certificates    ".trim());
		MimeMap.put("p7c	".trim(), "application/pkcs7-mime	                  ".trim());   MimeMap.put("p7m	".trim(), "application/pkcs7-mime              ".trim());
		MimeMap.put("p7r	".trim(), "application/x-pkcs7-certreqresp	          ".trim());   MimeMap.put("p7s	".trim(), "application/pkcs7-signature         ".trim());
		MimeMap.put("pc5	".trim(), "application/x-pc5	                      ".trim());   MimeMap.put("pci	".trim(), "application/x-pci                   ".trim());
		MimeMap.put("pcl	".trim(), "application/x-pcl	                      ".trim());   MimeMap.put("pcx	".trim(), "application/x-pcx                   ".trim());
		MimeMap.put("pdf	".trim(), "application/pdf	                          ".trim());   MimeMap.put("tif	".trim(), "image/tiff                          ".trim());
		MimeMap.put("pdx	".trim(), "application/vnd.adobe.pdx	              ".trim());   MimeMap.put("pfx	".trim(), "application/x-pkcs12                ".trim());
		MimeMap.put("pgl	".trim(), "application/x-pgl	                      ".trim());   MimeMap.put("pic	".trim(), "application/x-pic                   ".trim());
		MimeMap.put("pko	".trim(), "application/vnd.ms-pki.pko	              ".trim());   MimeMap.put("pl	".trim(), "application/x-perl                  ".trim());
		MimeMap.put("plg	".trim(), "text/html	                              ".trim());   MimeMap.put("pls	".trim(), "audio/scpls                         ".trim());
		MimeMap.put("plt	".trim(), "application/x-plt	                      ".trim());   MimeMap.put("png	".trim(), "image/png                           ".trim());
		MimeMap.put("png	".trim(), "application/x-png	                      ".trim());   MimeMap.put("pot	".trim(), "application/vnd.ms-powerpoint       ".trim());
		MimeMap.put("ppa	".trim(), "application/vnd.ms-powerpoint	          ".trim());   MimeMap.put("ppm	".trim(), "application/x-ppm                   ".trim());
		MimeMap.put("pps	".trim(), "application/vnd.ms-powerpoint	          ".trim());   MimeMap.put("ppt	".trim(), "application/vnd.ms-powerpoint       ".trim());
		MimeMap.put("ppt	".trim(), "application/x-ppt	                      ".trim());   MimeMap.put("pr	".trim(), "application/x-pr                    ".trim());
		MimeMap.put("prf	".trim(), "application/pics-rules	                  ".trim());   MimeMap.put("prn	".trim(), "application/x-prn                   ".trim());
		MimeMap.put("prt	".trim(), "application/x-prt	                      ".trim());   MimeMap.put("ps  ".trim(),"application/x-ps                     ".trim());
		MimeMap.put("ps	    ".trim(), "application/postscript	                  ".trim());   MimeMap.put("ptn	".trim(), "application/x-ptn                   ".trim());
		MimeMap.put("pwz	".trim(), "application/vnd.ms-powerpoint	          ".trim());   MimeMap.put("r3t	".trim(), "text/vnd.rn-realtext3d              ".trim());
		MimeMap.put("ra	    ".trim(), "audio/vnd.rn-realaudio	                  ".trim());   MimeMap.put("ram	".trim(), "audio/x-pn-realaudio                ".trim());
		MimeMap.put("ras	".trim(), "application/x-ras	                      ".trim());   MimeMap.put("rat	".trim(), "application/rat-file                ".trim());
		MimeMap.put("rdf	".trim(), "text/xml	                                  ".trim());   MimeMap.put("rec	".trim(), "application/vnd.rn-recording        ".trim());
		MimeMap.put("red	".trim(), "application/x-red	                      ".trim());   MimeMap.put("rgb	".trim(), "application/x-rgb                   ".trim());
		MimeMap.put("rjs	".trim(), "application/vnd.rn-realsystem-rjs	      ".trim());   MimeMap.put("rjt	".trim(), "application/vnd.rn-realsystem-rjt   ".trim());
		MimeMap.put("rlc	".trim(), "application/x-rlc	                      ".trim());   MimeMap.put("rle	".trim(), "application/x-rle                   ".trim());
		MimeMap.put("rm	    ".trim(), "application/vnd.rn-realmedia	              ".trim());   MimeMap.put("rmf	".trim(), "application/vnd.adobe.rmf           ".trim());
		MimeMap.put("rmi	".trim(), "audio/mid	                              ".trim());   MimeMap.put("rmj	".trim(), "application/vnd.rn-realsystem-rmj   ".trim());
		MimeMap.put("rmm	".trim(), "audio/x-pn-realaudio	                      ".trim());   MimeMap.put("rmp	".trim(), "application/vnd.rn-rn_music_package ".trim());
		MimeMap.put("rms	".trim(), "application/vnd.rn-realmedia-secure	      ".trim());   MimeMap.put("rmvb".trim(), "application/vnd.rn-realmedia-vbr    ".trim());
		MimeMap.put("rmx	".trim(), "application/vnd.rn-realsystem-rmx	      ".trim());   MimeMap.put("rnx	".trim(), "application/vnd.rn-realplayer       ".trim());
		MimeMap.put("rp	    ".trim(), "image/vnd.rn-realpix	                      ".trim());   MimeMap.put("rpm	".trim(), "audio/x-pn-realaudio-plugin         ".trim());
		MimeMap.put("rsml	".trim(), "application/vnd.rn-rsml	                  ".trim());   MimeMap.put("rt	".trim(), "text/vnd.rn-realtext                ".trim());
		MimeMap.put("rtf	".trim(), "application/msword	                      ".trim());   MimeMap.put("rtf	".trim(), "application/x-rtf                   ".trim());
		MimeMap.put("rv	    ".trim(), "video/vnd.rn-realvideo	                  ".trim());   MimeMap.put("sam	".trim(), "application/x-sam                   ".trim());
		MimeMap.put("sat	".trim(), "application/x-sat	                      ".trim());   MimeMap.put("sdp	".trim(), "application/sdp                     ".trim());
		MimeMap.put("sdw	".trim(), "application/x-sdw	                      ".trim());   MimeMap.put("sit	".trim(), "application/x-stuffit               ".trim());
		MimeMap.put("slb	".trim(), "application/x-slb	                      ".trim());   MimeMap.put("sld	".trim(), "application/x-sld                   ".trim());
		MimeMap.put("slk	".trim(), "drawing/x-slk	                          ".trim());   MimeMap.put("smi	".trim(), "application/smil                    ".trim());
		MimeMap.put("smil	".trim(), "application/smil	                          ".trim());   MimeMap.put("smk	".trim(), "application/x-smk                   ".trim());
		MimeMap.put("snd	".trim(), "audio/basic	                              ".trim());   MimeMap.put("sol	".trim(), "text/plain                          ".trim());
		MimeMap.put("sor	".trim(), "text/plain	                              ".trim());   MimeMap.put("spc	".trim(), "application/x-pkcs7-certificates    ".trim());
		MimeMap.put("spl	".trim(), "application/futuresplash	                  ".trim());   MimeMap.put("spp	".trim(), "text/xml                            ".trim());
		MimeMap.put("ssm	".trim(), "application/streamingmedia	              ".trim());   MimeMap.put("sst	".trim(), "application/vnd.ms-pki.certstore    ".trim());
		MimeMap.put("stl	".trim(), "application/vnd.ms-pki.stl	              ".trim());   MimeMap.put("stm	".trim(), "text/html                           ".trim());
		MimeMap.put("sty	".trim(), "application/x-sty	                      ".trim());   MimeMap.put("svg	".trim(), "text/xml                            ".trim());
		MimeMap.put("swf	".trim(), "application/x-shockwave-flash	          ".trim());   MimeMap.put("tdf	".trim(), "application/x-tdf                   ".trim());
		MimeMap.put("tg4	".trim(), "application/x-tg4	                      ".trim());   MimeMap.put("tga	".trim(), "application/x-tga                   ".trim());
		MimeMap.put("tif	".trim(), "image/tiff	                              ".trim());   MimeMap.put("tif	".trim(), "application/x-tif                   ".trim());
		MimeMap.put("tiff	".trim(), "image/tiff	                              ".trim());   MimeMap.put("tld	".trim(), "text/xml                            ".trim());
		MimeMap.put("top	".trim(), "drawing/x-top	                          ".trim());   MimeMap.put("torrent".trim(), "application/x-bittorrent            ".trim());
		MimeMap.put("tsd	".trim(), "text/xml	                                  ".trim());   MimeMap.put("txt	".trim(), "text/plain                          ".trim());
		MimeMap.put("uin	".trim(), "application/x-icq	                      ".trim());   MimeMap.put("uls	".trim(), "text/iuls                           ".trim());
		MimeMap.put("vcf	".trim(), "text/x-vcard	                              ".trim());   MimeMap.put("vda	".trim(), "application/x-vda                   ".trim());
		MimeMap.put("vdx	".trim(), "application/vnd.visio	                  ".trim());   MimeMap.put("vml	".trim(), "text/xml                            ".trim());
		MimeMap.put("vpg	".trim(), "application/x-vpeg005	                  ".trim());   MimeMap.put("vsd	".trim(), "application/vnd.visio               ".trim());
		MimeMap.put("vsd	".trim(), "application/x-vsd	                      ".trim());   MimeMap.put("vss	".trim(), "application/vnd.visio               ".trim());
		MimeMap.put("vst	".trim(), "application/vnd.visio	                  ".trim());   MimeMap.put("vst	".trim(), "application/x-vst                   ".trim());
		MimeMap.put("vsw	".trim(), "application/vnd.visio	                  ".trim());   MimeMap.put("vsx	".trim(), "application/vnd.visio               ".trim());
		MimeMap.put("vtx	".trim(), "application/vnd.visio	                  ".trim());   MimeMap.put("vxml".trim(), "text/xml                            ".trim());
		MimeMap.put("wav	".trim(), "audio/wav	                              ".trim());   MimeMap.put("wax	".trim(), "audio/x-ms-wax                      ".trim());
		MimeMap.put("wb1	".trim(), "application/x-wb1	                      ".trim());   MimeMap.put("wb2	".trim(), "application/x-wb2                   ".trim());
		MimeMap.put("wb3	".trim(), "application/x-wb3	                      ".trim());   MimeMap.put("wbmp".trim(), "image/vnd.wap.wbmp                  ".trim());
		MimeMap.put("wiz	".trim(), "application/msword	                      ".trim());   MimeMap.put("wk3	".trim(), "application/x-wk3                   ".trim());
		MimeMap.put("wk4	".trim(), "application/x-wk4	                      ".trim());   MimeMap.put("wkq	".trim(), "application/x-wkq                   ".trim());
		MimeMap.put("wks	".trim(), "application/x-wks	                      ".trim());   MimeMap.put("wm	".trim(), "video/x-ms-wm                       ".trim());
		MimeMap.put("wma	".trim(), "audio/x-ms-wma	                          ".trim());   MimeMap.put("wmd	".trim(), "application/x-ms-wmd                ".trim());
		MimeMap.put("wmf	".trim(), "application/x-wmf	                      ".trim());   MimeMap.put("wml	".trim(), "text/vnd.wap.wml                    ".trim());
		MimeMap.put("wmv	".trim(), "video/x-ms-wmv	                          ".trim());   MimeMap.put("wmx	".trim(), "video/x-ms-wmx                      ".trim());
		MimeMap.put("wmz	".trim(), "application/x-ms-wmz	                      ".trim());   MimeMap.put("wp6	".trim(), "application/x-wp6                   ".trim());
		MimeMap.put("wpd	".trim(), "application/x-wpd	                      ".trim());   MimeMap.put("wpg	".trim(), "application/x-wpg                   ".trim());
		MimeMap.put("wpl	".trim(), "application/vnd.ms-wpl	                  ".trim());   MimeMap.put("wq1	".trim(), "application/x-wq1                   ".trim());
		MimeMap.put("wr1	".trim(), "application/x-wr1	                      ".trim());   MimeMap.put("wri	".trim(), "application/x-wri                   ".trim());
		MimeMap.put("wrk	".trim(), "application/x-wrk	                      ".trim());   MimeMap.put("ws	".trim(), "application/x-ws                    ".trim());
		MimeMap.put("ws2	".trim(), "application/x-ws	                          ".trim());   MimeMap.put("wsc	".trim(), "text/scriptlet                      ".trim());
		MimeMap.put("wsdl	".trim(), "text/xml	                                  ".trim());   MimeMap.put("wvx	".trim(), "video/x-ms-wvx                      ".trim());
		MimeMap.put("xdp	".trim(), "application/vnd.adobe.xdp	              ".trim());   MimeMap.put("xdr	".trim(), "text/xml                            ".trim());
		MimeMap.put("xfd	".trim(), "application/vnd.adobe.xfd	              ".trim());   MimeMap.put("xfdf".trim(), "application/vnd.adobe.xfdf          ".trim());
		MimeMap.put("xhtml	".trim(), "text/html	                              ".trim());   MimeMap.put("xls	".trim(), "application/vnd.ms-excel application/x-excel".trim());
		MimeMap.put("xlw	".trim(), "application/x-xlw                   ".trim());
		MimeMap.put("xml	".trim(), "text/xml	                                  ".trim());   MimeMap.put("xpl	".trim(), "audio/scpls                         ".trim());
		MimeMap.put("xq	    ".trim(), "text/xml	                                  ".trim());   MimeMap.put("xql	".trim(), "text/xml                            ".trim());
		MimeMap.put("xquery	".trim(), "text/xml	                                  ".trim());   MimeMap.put("xsd	".trim(), "text/xml                            ".trim());
		MimeMap.put("xsl	".trim(), "text/xml	                                  ".trim());   MimeMap.put("xslt".trim(), "text/xml                            ".trim());
		MimeMap.put("xwd	".trim(), "application/x-xwd	                      ".trim());   MimeMap.put("x_b	".trim(), "application/x-x_b                   ".trim());
		MimeMap.put("sis	".trim(), "application/vnd.symbian.install	          ".trim());   MimeMap.put("sisx".trim(), "application/vnd.symbian.install     ".trim());
		MimeMap.put("x_t	".trim(), "application/x-x_t	                      ".trim());   MimeMap.put("ipa	".trim(), "application/vnd.iphone              ".trim());
		MimeMap.put("apk	".trim(), "application/vnd.android.package-archive	  ".trim());   MimeMap.put("xap	".trim(), "application/x-silverlight-app       ".trim());
	}
			
	public static final String getMIMEType(String docSuffix){
		String mime = MimeMap.get(docSuffix);
		if(null == mime){
			mime = "application/octet-stream";
		}
		
		return mime;
	}
}
