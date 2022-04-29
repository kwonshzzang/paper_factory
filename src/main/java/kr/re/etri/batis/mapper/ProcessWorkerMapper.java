package kr.re.etri.batis.mapper;

import java.util.List;
import kr.re.etri.batis.domain.ProcessWorker;
import org.apache.ibatis.annotations.Param;

public interface ProcessWorkerMapper {

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table process_worker
	 * @mbg.generated  Wed Apr 20 10:51:28 KST 2022
	 */
	int deleteByPrimaryKey(@Param("processId") String processId, @Param("workerId") String workerId);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table process_worker
	 * @mbg.generated  Wed Apr 20 10:51:28 KST 2022
	 */
	int insert(ProcessWorker row);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table process_worker
	 * @mbg.generated  Wed Apr 20 10:51:28 KST 2022
	 */
	ProcessWorker selectByPrimaryKey(@Param("processId") String processId, @Param("workerId") String workerId);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table process_worker
	 * @mbg.generated  Wed Apr 20 10:51:28 KST 2022
	 */
	List<ProcessWorker> selectAll();

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table process_worker
	 * @mbg.generated  Wed Apr 20 10:51:28 KST 2022
	 */
	int updateByPrimaryKey(ProcessWorker row);
}