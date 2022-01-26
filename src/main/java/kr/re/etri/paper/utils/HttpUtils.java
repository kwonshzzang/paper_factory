package kr.re.etri.paper.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

public class HttpUtils {
	private static final Logger logger = LoggerFactory.getLogger(HttpUtils.class);
	static ObjectMapper mapper = new ObjectMapper();
	
	public static Map<String, Object> HTTP_REQUEST(String url, String body){
		String result = "";
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		if(body == null || body == "") {
			result = HTTP_GET(url);
		}else {
			result = HTTP_POST(url, body);
		}
		
		if(result.length() > 0) {
			try {
				resultMap = mapper.readValue(result, new TypeReference<Map<String, Object>>(){});
			} catch (JsonProcessingException e) {
				// TODO Auto-generated catch block
			}
		}
		
		return resultMap;
	}

	public static String HTTP_POST(String url, String body) {
		StringBuffer sb = new StringBuffer();
						
		CloseableHttpClient client = HttpClients.createDefault();
	    HttpPost httpPost = new HttpPost(url);	    
	 
	    StringEntity entity;
	    
		try {
			entity = new StringEntity(body);
			httpPost.setEntity(entity);
		    httpPost.setHeader("Accept", "application/json");
		    httpPost.setHeader("Content-type", "application/json");
		 
		    try {
		    	
		    	logger.debug("\n===================================\nSend Body : \n{}\n===============================", 
		    			body);
		    	
				CloseableHttpResponse response = client.execute(httpPost);								 
		        BufferedReader reader = new BufferedReader(new InputStreamReader(
		        		response.getEntity().getContent()));
		 
		        String inputLine;
		 
		        while ((inputLine = reader.readLine()) != null) {
		            sb.append(inputLine);
		        }
		        
		        reader.close();

				logger.debug("\n===================================\nHTTP Response Status : {} \n" +
						"Result : \n{}" +
						"\n===================================\n", 
						response.getStatusLine().getStatusCode(), sb.toString());
				
		        client.close();

		        return sb.toString();

			} catch (ClientProtocolException e) {
				// TODO Auto-generated catch block
			} catch (IOException e) {
				// TODO Auto-generated catch block
			}
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			logger.error("HTTP_POST");
		}	
		
		return sb.toString();
		
	}
	

	public static String HTTP_GET(String url) {

		StringBuffer sb = new StringBuffer();
		//String json = null;
				
		CloseableHttpClient client = HttpClients.createDefault();
	    HttpGet httpGet = new HttpGet(url);
	 
		try {
			httpGet.setHeader("Accept", "application/json");
			httpGet.setHeader("Content-type", "application/json");
	    	
	    	logger.debug("\n===================================\nSend Start HTTP GET\n===============================");
			CloseableHttpResponse response = client.execute(httpGet);
			
			BufferedReader reader = new BufferedReader(new InputStreamReader(
	        		response.getEntity().getContent()));
	 
	        String inputLine;
	 
	        while ((inputLine = reader.readLine()) != null) {
	            sb.append(inputLine);
	        }
	        
	        reader.close();
			
	        /*
	        json = EntityUtils.toString(response.getEntity(), "UTF-8");
	        
	        logger.debug("Response Message {}", json);
	        */
	        
	        client.close();
	        

			logger.debug("\n===================================\nHTTP Response Status : {} \n" +
					"Result : \n{}" +
					"\n===================================\n", 
					response.getStatusLine().getStatusCode(), sb.toString());

		}catch(Exception e) {
		}
		
		return sb.toString();
				
	}
}
