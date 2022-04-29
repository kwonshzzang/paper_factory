package kr.re.etri.paper.data;

import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import kr.re.etri.paper.utils.CalcUtils;

public class DBService {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	CalcUtils CU = new CalcUtils();
	
	public SensorInfo CreateData(String id) {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("YYYY-MM-dd HH:mm:ss");
		String date = simpleDateFormat.format(new Date());
		float spa = CU.Get_Random_Max(10, 1 * Math.random());
		
		float me = CU.Get_Random_Max(1, 1000 * Math.random());
		float av = CU.Get_Random_Max(10, 40000 * Math.random());
		
		INSERT_HISTORY(id, date, spa, me, av);
		
		SensorInfo info = CreateItem(id, date, spa, me, av);
		
		return info;

	}
	
	public SensorInfo CreateItem(String thingid, String timestamp, float spa, float me, float av) {
		SensorInfo info = new SensorInfo();

		info.setThingId(thingid);
		info.setTimestamp(timestamp);
		
		DataValue data = new DataValue();
		data.setType("spa");
		data.setValue(spa);				
		info.getValues().add(data);
		
		data = new DataValue();
		data.setType("me");
		data.setValue(me);				
		info.getValues().add(data);
		
		data = new DataValue();
		data.setType("av");
		data.setValue(av);				
		info.getValues().add(data);
						
		return info;
	}
	
	public List<SensorInfo> GET_REALTIME_LIST(){
		List<SensorInfo> list = null;
		String query = "select * from TBL_HISTORY where idx in (select max(idx) from TBL_HISTORY GROUP BY thingId)";
		
		try {
			list = jdbcTemplate.query(query, (ResultSet rs, int index )->{
				
				String id = rs.getString("thingId");
				String timestamp = rs.getString("timestamp");
				float spa = rs.getFloat("spa");
				float me = rs.getFloat("me");
				float av = rs.getFloat("av");
								
				SensorInfo info = CreateItem(id, timestamp, spa, me, av);
								
				return info;
			});
			
		}catch(EmptyResultDataAccessException ex){
			list = null;
			//System.out.println(ex.getMessage());
		}catch (Exception e) {
			list = null;
			//System.out.println(e.getMessage());
		}
		
		return list;
	}
	
	public List<SensorInfo> GET_HISTORY_LIST(){
		List<SensorInfo> list = null;
		String query = "select * from TBL_HISTORY order by idx desc limit 100";
		
		try {
			list = jdbcTemplate.query(query, (ResultSet rs, int index )->{
				
				String id = rs.getString("thingId");
				String timestamp = rs.getString("timestamp");
				float spa = rs.getFloat("spa");
				float me = rs.getFloat("me");
				float av = rs.getFloat("av");
								
				SensorInfo info = CreateItem(id, timestamp, spa, me, av);
								
				return info;
			});
			
		}catch(EmptyResultDataAccessException ex){
			list = null;
			//System.out.println(ex.getMessage());
		}catch (Exception e) {
			list = null;
			//System.out.println(e.getMessage());
		}
		
		return list;
	}
	
	public List<SensorInfo> GET_HISTORY_LIST_PAGE(int page, int count){
		List<SensorInfo> list = null;
		String query = "select * from TBL_HISTORY order by idx desc limit " + count + " offset " + page;
		
		try {
			list = jdbcTemplate.query(query, (ResultSet rs, int index )->{
				
				String id = rs.getString("thingId");
				String timestamp = rs.getString("timestamp");
				float spa = rs.getFloat("spa");
				float me = rs.getFloat("me");
				float av = rs.getFloat("av");
								
				SensorInfo info = CreateItem(id, timestamp, spa, me, av);
								
				return info;
			});
			
		}catch(EmptyResultDataAccessException ex){
			list = null;
			//System.out.println(ex.getMessage());
		}catch (Exception e) {
			list = null;
			//System.out.println(e.getMessage());
		}
		
		return list;
	}

	public int GET_TOTAL_COUNT() {
		int count = 0;
		String query = "select count(*) from TBL_HISTORY";
		
		try {
			count = jdbcTemplate.queryForObject(query, Integer.class);
			
		}catch(EmptyResultDataAccessException e) {
			count = 0;		
		}catch(Exception e) {
			count = 0;
		}
		
		return count;
	}
	
	public void INSERT_HISTORY(String thingid, String timestamp, float spa, float me, float av) {
		String query = "";
		
		query = "insert into TBL_HISTORY(thingId, timestamp, spa, me, av) " +
				"values(?, ?, ?, ?, ?)";
		
		try {
			jdbcTemplate.update(query, thingid, timestamp, spa, me, av);
			
		}catch(DataAccessException ex){
			//System.out.println(ex.getMessage());
		}catch (Exception e) {
			//System.out.println(e.getMessage());
		}
	}
}
