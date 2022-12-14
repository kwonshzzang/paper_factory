package kr.re.etri.batis.domain;

import java.util.Date;

public class ProductPlan {
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column product_plan.product_plan_id
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    private String productPlanId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column product_plan.product_start_date
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    private Date productStartDate;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column product_plan.product_end_date
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    private Date productEndDate;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column product_plan.product_paper_category
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    private String productPaperCategory;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column product_plan.product_cotting_paper_category
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    private String productCottingPaperCategory;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column product_plan.coiling
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    private Integer coiling;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column product_plan.output
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    private Integer output;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column product_plan.output_unit_id
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    private String outputUnitId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column product_plan.digital
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    private String digital;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column product_plan.skid
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    private String skid;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column product_plan.bigo
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    private String bigo;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column product_plan.created_at
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    private Date createdAt;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column product_plan.created_by
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    private String createdBy;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column product_plan.updated_at
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    private Date updatedAt;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column product_plan.updated_by
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    private String updatedBy;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column product_plan.product_plan_id
     *
     * @return the value of product_plan.product_plan_id
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public String getProductPlanId() {
        return productPlanId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column product_plan.product_plan_id
     *
     * @param productPlanId the value for product_plan.product_plan_id
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public void setProductPlanId(String productPlanId) {
        this.productPlanId = productPlanId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column product_plan.product_start_date
     *
     * @return the value of product_plan.product_start_date
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public Date getProductStartDate() {
        return productStartDate;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column product_plan.product_start_date
     *
     * @param productStartDate the value for product_plan.product_start_date
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public void setProductStartDate(Date productStartDate) {
        this.productStartDate = productStartDate;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column product_plan.product_end_date
     *
     * @return the value of product_plan.product_end_date
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public Date getProductEndDate() {
        return productEndDate;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column product_plan.product_end_date
     *
     * @param productEndDate the value for product_plan.product_end_date
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public void setProductEndDate(Date productEndDate) {
        this.productEndDate = productEndDate;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column product_plan.product_paper_category
     *
     * @return the value of product_plan.product_paper_category
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public String getProductPaperCategory() {
        return productPaperCategory;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column product_plan.product_paper_category
     *
     * @param productPaperCategory the value for product_plan.product_paper_category
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public void setProductPaperCategory(String productPaperCategory) {
        this.productPaperCategory = productPaperCategory;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column product_plan.product_cotting_paper_category
     *
     * @return the value of product_plan.product_cotting_paper_category
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public String getProductCottingPaperCategory() {
        return productCottingPaperCategory;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column product_plan.product_cotting_paper_category
     *
     * @param productCottingPaperCategory the value for product_plan.product_cotting_paper_category
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public void setProductCottingPaperCategory(String productCottingPaperCategory) {
        this.productCottingPaperCategory = productCottingPaperCategory;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column product_plan.coiling
     *
     * @return the value of product_plan.coiling
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public Integer getCoiling() {
        return coiling;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column product_plan.coiling
     *
     * @param coiling the value for product_plan.coiling
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public void setCoiling(Integer coiling) {
        this.coiling = coiling;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column product_plan.output
     *
     * @return the value of product_plan.output
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public Integer getOutput() {
        return output;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column product_plan.output
     *
     * @param output the value for product_plan.output
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public void setOutput(Integer output) {
        this.output = output;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column product_plan.output_unit_id
     *
     * @return the value of product_plan.output_unit_id
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public String getOutputUnitId() {
        return outputUnitId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column product_plan.output_unit_id
     *
     * @param outputUnitId the value for product_plan.output_unit_id
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public void setOutputUnitId(String outputUnitId) {
        this.outputUnitId = outputUnitId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column product_plan.digital
     *
     * @return the value of product_plan.digital
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public String getDigital() {
        return digital;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column product_plan.digital
     *
     * @param digital the value for product_plan.digital
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public void setDigital(String digital) {
        this.digital = digital;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column product_plan.skid
     *
     * @return the value of product_plan.skid
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public String getSkid() {
        return skid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column product_plan.skid
     *
     * @param skid the value for product_plan.skid
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public void setSkid(String skid) {
        this.skid = skid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column product_plan.bigo
     *
     * @return the value of product_plan.bigo
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public String getBigo() {
        return bigo;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column product_plan.bigo
     *
     * @param bigo the value for product_plan.bigo
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public void setBigo(String bigo) {
        this.bigo = bigo;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column product_plan.created_at
     *
     * @return the value of product_plan.created_at
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public Date getCreatedAt() {
        return createdAt;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column product_plan.created_at
     *
     * @param createdAt the value for product_plan.created_at
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column product_plan.created_by
     *
     * @return the value of product_plan.created_by
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public String getCreatedBy() {
        return createdBy;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column product_plan.created_by
     *
     * @param createdBy the value for product_plan.created_by
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column product_plan.updated_at
     *
     * @return the value of product_plan.updated_at
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public Date getUpdatedAt() {
        return updatedAt;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column product_plan.updated_at
     *
     * @param updatedAt the value for product_plan.updated_at
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column product_plan.updated_by
     *
     * @return the value of product_plan.updated_by
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public String getUpdatedBy() {
        return updatedBy;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column product_plan.updated_by
     *
     * @param updatedBy the value for product_plan.updated_by
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }
}