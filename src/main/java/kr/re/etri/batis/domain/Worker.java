package kr.re.etri.batis.domain;

import java.util.Date;

public class Worker {
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column worker.worker_id
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    private String workerId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column worker.worker_name
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    private String workerName;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column worker.created_at
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    private Date createdAt;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column worker.created_by
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    private String createdBy;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column worker.updated_at
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    private Date updatedAt;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column worker.updated_by
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    private String updatedBy;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column worker.worker_id
     *
     * @return the value of worker.worker_id
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public String getWorkerId() {
        return workerId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column worker.worker_id
     *
     * @param workerId the value for worker.worker_id
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public void setWorkerId(String workerId) {
        this.workerId = workerId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column worker.worker_name
     *
     * @return the value of worker.worker_name
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public String getWorkerName() {
        return workerName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column worker.worker_name
     *
     * @param workerName the value for worker.worker_name
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public void setWorkerName(String workerName) {
        this.workerName = workerName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column worker.created_at
     *
     * @return the value of worker.created_at
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public Date getCreatedAt() {
        return createdAt;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column worker.created_at
     *
     * @param createdAt the value for worker.created_at
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column worker.created_by
     *
     * @return the value of worker.created_by
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public String getCreatedBy() {
        return createdBy;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column worker.created_by
     *
     * @param createdBy the value for worker.created_by
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column worker.updated_at
     *
     * @return the value of worker.updated_at
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public Date getUpdatedAt() {
        return updatedAt;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column worker.updated_at
     *
     * @param updatedAt the value for worker.updated_at
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column worker.updated_by
     *
     * @return the value of worker.updated_by
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public String getUpdatedBy() {
        return updatedBy;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column worker.updated_by
     *
     * @param updatedBy the value for worker.updated_by
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }
}