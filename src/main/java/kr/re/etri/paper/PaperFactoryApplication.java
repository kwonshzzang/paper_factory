package kr.re.etri.paper;

import java.util.TimeZone;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;

import kr.re.etri.paper.data.MainConfig;

@SpringBootApplication
@EnableAutoConfiguration
@EnableConfigurationProperties(MainConfig.class)
@MapperScan(basePackages = { "kr.re.etri.batis.mapper"})
public class PaperFactoryApplication {

	public static void main(String[] args) {
		SpringApplication.run(PaperFactoryApplication.class, args);
	}

}
