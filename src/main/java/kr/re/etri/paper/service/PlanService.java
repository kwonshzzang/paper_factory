package kr.re.etri.paper.service;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.re.etri.batis.domain.ProductPlan;
import kr.re.etri.batis.mapper.ProductPlanMapper;
import kr.re.etri.paper.utils.CalcUtils;

@Service
public class PlanService {
	
	@Autowired
	ProductPlanMapper mapper_product_plan;
	
	@PostConstruct
	public void Init() {
		CalcUtils.SetNow(2022, 3, 7, 6, 0);
	}

	/* ----------------------------------------------------
	 *
	 * 데이터 검색
	 *
	 * -------------------------------------------------- */
	
	/**
	 * 전체 생산 계획 목록
	 * @return
	 */
	public List<ProductPlan> getListAll(){
		return mapper_product_plan.selectAll();
	}
	
	/***
	 * 생산 계획 ID에 해당하는 생산 계획
	 * @param plan_id
	 * @return
	 */
	public ProductPlan getPlanById(String plan_id) {
		return mapper_product_plan.selectByPrimaryKey(plan_id);
	}
	
	/**
	 * 현재 시각 생산 계획
	 * @return
	 */
	public Map<String, String> getPlan_Now() {
		return mapper_product_plan.selectNowPlan();
	}
	
	/**
	 * 금일 생산 계획에 포함된 생산 계획 목록
	 * @return
	 */
	public List<Map<String, String>> getListPlan_Today(){
		return mapper_product_plan.selectTodayPlan();
	}
	

	public List<Map<String, String>> getListPlan_Month(){
		return mapper_product_plan.selectMonthPlanList();
	}
	
	public List<Map<String, String>> getListTotal_Month_PerProductType(){
		return mapper_product_plan.selectMonthTotalPerProductType("%Y%m");
	}
	
	public List<Map<String, String>> getListTotal_Today_Now_PerProductType(){
		return mapper_product_plan.selectTodayNowTotalPerProductType("%Y%m%d");
	}
	
	public List<Map<String, String>> getListTotal_Today_PerProductType(){
		return mapper_product_plan.selectMonthTotalPerProductType("%Y%m%d");
	}
	

	public List<Map<String, String>> getListTotal_Today_Now_Product_Weight(){
		return mapper_product_plan.selectToday_Now_Product_Weight();
	}

	public List<Map<String, String>> getListTotal_Today_Total_Product_Weight(){
		return mapper_product_plan.selectToday_Total_Product_Weight();
	}

	/* ----------------------------------------------------
	 *
	 * 데이터 추가
	 *
	 * -------------------------------------------------- */
		
	/**
	 * 생산 계획 추가
	 * @param plan
	 * @return
	 */
	public int insertPlan(ProductPlan plan) {
		return mapper_product_plan.insert(plan);
	}
	
	/**
	 * 생산 계획 변경
	 * @param plan
	 * @return
	 */
	public int updatePlan(ProductPlan plan) {
		return mapper_product_plan.updateByPrimaryKey(plan);
	}
	
	/**
	 * 생산 계획 삭제
	 * @param id
	 * @return
	 */
	public int deletePlan(String id) {
		return mapper_product_plan.deleteByPrimaryKey(id);
	}
}
