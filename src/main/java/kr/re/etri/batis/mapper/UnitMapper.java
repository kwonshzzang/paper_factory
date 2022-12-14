package kr.re.etri.batis.mapper;

import java.util.List;
import kr.re.etri.batis.domain.Unit;

public interface UnitMapper {

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table unit
	 * @mbg.generated  Wed Apr 20 10:51:28 KST 2022
	 */
	int deleteByPrimaryKey(String unitId);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table unit
	 * @mbg.generated  Wed Apr 20 10:51:28 KST 2022
	 */
	int insert(Unit row);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table unit
	 * @mbg.generated  Wed Apr 20 10:51:28 KST 2022
	 */
	Unit selectByPrimaryKey(String unitId);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table unit
	 * @mbg.generated  Wed Apr 20 10:51:28 KST 2022
	 */
	List<Unit> selectAll();

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table unit
	 * @mbg.generated  Wed Apr 20 10:51:28 KST 2022
	 */
	int updateByPrimaryKey(Unit row);
}