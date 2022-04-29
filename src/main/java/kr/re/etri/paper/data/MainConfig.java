package kr.re.etri.paper.data;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("file")
public class MainConfig {
	private String location;

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}
	
}
