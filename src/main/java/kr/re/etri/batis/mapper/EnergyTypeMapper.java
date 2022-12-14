package kr.re.etri.batis.mapper;

import java.util.List;
import kr.re.etri.batis.domain.EnergyType;

public interface EnergyTypeMapper {

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table energy_type
	 * @mbg.generated  Wed Apr 20 10:51:28 KST 2022
	 */
	int deleteByPrimaryKey(String energyTypeId);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table energy_type
	 * @mbg.generated  Wed Apr 20 10:51:28 KST 2022
	 */
	int insert(EnergyType row);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table energy_type
	 * @mbg.generated  Wed Apr 20 10:51:28 KST 2022
	 */
	EnergyType selectByPrimaryKey(String energyTypeId);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table energy_type
	 * @mbg.generated  Wed Apr 20 10:51:28 KST 2022
	 */
	List<EnergyType> selectAll();

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table energy_type
	 * @mbg.generated  Wed Apr 20 10:51:28 KST 2022
	 */
	int updateByPrimaryKey(EnergyType row);
}