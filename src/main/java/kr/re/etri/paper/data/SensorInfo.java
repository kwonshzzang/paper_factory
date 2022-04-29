package kr.re.etri.paper.data;

import java.util.ArrayList;
import java.util.List;

public class SensorInfo {
	private String thingId;
	private String timestamp;
	private List<DataValue> values = new ArrayList<DataValue>();
	public String getThingId() {
		return thingId;
	}
	public void setThingId(String thingId) {
		this.thingId = thingId;
	}
	public String getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}
	public List<DataValue> getValues() {
		return values;
	}
	public void setValues(List<DataValue> values) {
		this.values = values;
	}
	
	
}
