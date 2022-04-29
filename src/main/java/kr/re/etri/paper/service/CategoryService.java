package kr.re.etri.paper.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.re.etri.batis.domain.EnergyGoal;
import kr.re.etri.batis.domain.EnergyType;
import kr.re.etri.batis.domain.Product;
import kr.re.etri.batis.domain.ProductType;
import kr.re.etri.batis.domain.Tag;
import kr.re.etri.batis.domain.Unit;
import kr.re.etri.batis.mapper.EnergyGoalMapper;
import kr.re.etri.batis.mapper.EnergyTypeMapper;
import kr.re.etri.batis.mapper.ProcessMapper;
import kr.re.etri.batis.mapper.ProductMapper;
import kr.re.etri.batis.mapper.ProductTypeMapper;
import kr.re.etri.batis.mapper.TagMapper;
import kr.re.etri.batis.mapper.UnitMapper;

@Service
public class CategoryService {

	@Autowired
	ProductTypeMapper mapper_product_type;
	
	@Autowired
	TagMapper mapper_tag;
	
	@Autowired
	UnitMapper mapper_unit;
	
	@Autowired
	EnergyTypeMapper mapper_energy_type;
	
	@Autowired
	ProductMapper mapper_product;
	
	@Autowired
	EnergyGoalMapper mapper_goal;
	
	@Autowired
	ProcessMapper mapper_process;
	
	/* ----------------------------------------------------
	 *
	 * ID에 해당하는 정보 검색
	 *
	 * -------------------------------------------------- */	
	
	
	public Product get_Product(String id) {
		return mapper_product.selectByPrimaryKey(id);
	}
	
	public ProductType get_ProductType(String id) {
		return mapper_product_type.selectByPrimaryKey(id);
	}
	
	public Unit get_Unit(String id) {
		return mapper_unit.selectByPrimaryKey(id);
	}
	
	public Tag get_Tag(String id) {
		return mapper_tag.selectByPrimaryKey(id);
	}
	
	public EnergyType get_EnergyType(String id) {
		return mapper_energy_type.selectByPrimaryKey(id);
	}
	
	
	
	/* ----------------------------------------------------
	 *
	 * 리스트에 해당하는 정보 검색
	 *
	 * -------------------------------------------------- */
	
	/**
	 * 에너지 타입 리스트 조회
	 * @return
	 */
	public List<EnergyType> getList_EnergyType(){
		return mapper_energy_type.selectAll();
	}
	
	/**
	 * 제지 타입 리스트 조회
	 * @return
	 */
	public List<ProductType> getList_ProductType(){
		return mapper_product_type.selectAll();
	}
	
	/**
	 * 제지에 따른 평량 정보를 취합한 생산 공정 리스트
	 * @return
	 */
	public List<Product> getList_Product(){
		return mapper_product.selectAll();
	}
	
	/**
	 * 단위 타입 리스트
	 * @return
	 */
	public List<Unit> getList_Unit(){
		return mapper_unit.selectAll();
	}
	
	/**
	 * 장비 센서 타입 리스트
	 * @return
	 */
	public List<Tag> getList_Tag(){
		return mapper_tag.selectAll();
	}
	
	public List<EnergyGoal> getList_Goal(){
		return mapper_goal.selectAll();
	}
	
	public List<Map<String, String>> getList_ProcessChangeTime(){
		return mapper_process.selectChangeTime();
	}
	
	
	/* ----------------------------------------------------
	 *
	 * 데이터 삽입 함수
	 *
	 * -------------------------------------------------- */
		
	public int insert_Energy_Goal(EnergyGoal item) {
		return mapper_goal.insert(item);
	}

	
	
	/* ----------------------------------------------------
	 *
	 * 데이터 삭제 함수
	 *
	 * -------------------------------------------------- */
		
	public int delete_Energy_Goal(String type) {
		return mapper_goal.deleteByEnergyType(type);
	}
}
