package kr.re.etri.paper.utils;

import java.io.FileReader;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;

import kr.re.etri.paper.csv.ELEC;
import kr.re.etri.paper.csv.Flux;
import kr.re.etri.paper.csv.TAGS;

public class CsvUtils {

	public static List<ELEC> readDataFromCsvForELEC(String filePath){
		List<ELEC> list = new ArrayList<>();

        try {
	        CSVReader reader = new CSVReader(new FileReader(filePath)); // 1
	        String [] nextLine;
	        boolean first = true;
	        int count = 0;
	        	        
			while ((nextLine = reader.readNext()) != null) {   // 2
				if(first) {
					first = false;
					continue;
				}
				
				ELEC item = new ELEC();
				
			    for (int i = 0; i < nextLine.length; i++) {
			    	switch (i) {
					case 0:
						item.setDate(nextLine[i]);
						break;
					case 1:
						item.setKw1(nextLine[i]);
						break;
					case 2:
						item.setKw2(nextLine[i]);
						break;
					case 3:
						item.setKw3(nextLine[i]);
						break;
					case 4:
						item.setKwh1(nextLine[i]);
						break;
					case 5:
						item.setKwh2(nextLine[i]);
						break;
					case 6:
						item.setKwh3(nextLine[i]);
						break;
					}
			    }
			    
			    list.add(item);
			    count++;
			    
			    /*
			    if(count > 10) {
			    	break;
			    }
			    */
			}
			
		} catch (CsvValidationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        
        return list;
    }

	public static List<Flux> readDataFromCsvForFlux(String filePath){
		List<Flux> list = new ArrayList<>();

        try {
	        CSVReader reader = new CSVReader(new FileReader(filePath)); // 1
	        String [] nextLine;
	        int count = 0;
	        
			while ((nextLine = reader.readNext()) != null) {   // 2
								
				Flux item = new Flux();
				
			    for (int i = 0; i < nextLine.length; i++) {
			    	switch (i) {
					case 0:
						item.setName(nextLine[i]);
						break;
					case 1:
						item.setDate(nextLine[i]);
						break;
					case 2:
						item.setValue(nextLine[i]);
						break;
					}
			    }
			    
			    list.add(item);
			    count++;
			    
			    /*
			    if(count > 10) {
			    	break;
			    }
			    */
			    
			}
			
		} catch (CsvValidationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        
        return list;
    }
	


	public static List<TAGS> readDataFromCsvForTags(String filePath, int length){
		List<TAGS> list = new ArrayList<>();

        try {
	        CSVReader reader = new CSVReader(new FileReader(filePath)); // 1
	        String [] nextLine;
	        boolean first = true;
	        int count = 0;
	        	        
			while ((nextLine = reader.readNext()) != null) {   // 2
				if(first) {
					first = false;
					continue;
				}
								
				TAGS item = new TAGS();
				
			    for (int i = 0; i < nextLine.length; i++) {
			    	
			    	if(i > length) {
			    		break;
			    	}
			    	
			    	switch (i) {
					case 0:
						item.setDate(nextLine[i]);
						break;
					case 1:
						item.setFlow1(nextLine[i]);
						break;
					case 2:
						item.setSet1(nextLine[i]);
						break;
					case 3:
						item.setFlow2(nextLine[i]);
						break;
					case 4:
						item.setSet2(nextLine[i]);
						break;
					case 5:
						item.setFlow3(nextLine[i]);
						break;
					case 6:
						item.setSet3(nextLine[i]);
						break;
					case 7:
						item.setFlow4(nextLine[i]);
						break;
					case 8:
						item.setSet4(nextLine[i]);
						break;
					}
			    }
			    
			    list.add(item);
			    count++;
			    
			    /*
			    if(count > 1000) {
			    	break;
			    }
			    */
			}
			
		} catch (CsvValidationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        
        return list;
    }
}
