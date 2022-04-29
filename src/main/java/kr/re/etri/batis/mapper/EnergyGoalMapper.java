package kr.re.etri.batis.mapper;

import java.util.Date;
import java.util.List;
import kr.re.etri.batis.domain.EnergyGoal;
import org.apache.ibatis.annotations.Param;

public interface EnergyGoalMapper {

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table energy_goal
	 * @mbg.generated  Wed Apr 20 10:51:28 KST 2022
	 */
	int deleteByPrimaryKey(@Param("goalStartDate") Date goalStartDate, @Param("goalEndDate") Date goalEndDate,
			@Param("energyTypeId") String energyTypeId);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table energy_goal
	 * @mbg.generated  Wed Apr 20 10:51:28 KST 2022
	 */
	int insert(EnergyGoal row);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table energy_goal
	 * @mbg.generated  Wed Apr 20 10:51:28 KST 2022
	 */
	EnergyGoal selectByPrimaryKey(@Param("goalStartDate") Date goalStartDate, @Param("goalEndDate") Date goalEndDate,
			@Param("energyTypeId") String energyTypeId);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table energy_goal
	 * @mbg.generated  Wed Apr 20 10:51:28 KST 2022
	 */
	List<EnergyGoal> selectAll();

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table energy_goal
	 * @mbg.generated  Wed Apr 20 10:51:28 KST 2022
	 */
	int updateByPrimaryKey(EnergyGoal row);
	
	
	int deleteByEnergyType(String energyTypeId);
}