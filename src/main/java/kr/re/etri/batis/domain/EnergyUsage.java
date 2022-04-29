package kr.re.etri.batis.domain;

import java.math.BigDecimal;
import java.util.Date;

public class EnergyUsage {
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column energy_usage.measure_date
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    private Date measureDate;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column energy_usage.tag_id
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    private String tagId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column energy_usage.usage_value
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    private BigDecimal usageValue;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column energy_usage.adapt_unit_price
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    private BigDecimal adaptUnitPrice;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column energy_usage.energy_cost
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    private BigDecimal energyCost;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column energy_usage.measure_date
     *
     * @return the value of energy_usage.measure_date
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public Date getMeasureDate() {
        return measureDate;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column energy_usage.measure_date
     *
     * @param measureDate the value for energy_usage.measure_date
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public void setMeasureDate(Date measureDate) {
        this.measureDate = measureDate;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column energy_usage.tag_id
     *
     * @return the value of energy_usage.tag_id
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public String getTagId() {
        return tagId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column energy_usage.tag_id
     *
     * @param tagId the value for energy_usage.tag_id
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public void setTagId(String tagId) {
        this.tagId = tagId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column energy_usage.usage_value
     *
     * @return the value of energy_usage.usage_value
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public BigDecimal getUsageValue() {
        return usageValue;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column energy_usage.usage_value
     *
     * @param usageValue the value for energy_usage.usage_value
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public void setUsageValue(BigDecimal usageValue) {
        this.usageValue = usageValue;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column energy_usage.adapt_unit_price
     *
     * @return the value of energy_usage.adapt_unit_price
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public BigDecimal getAdaptUnitPrice() {
        return adaptUnitPrice;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column energy_usage.adapt_unit_price
     *
     * @param adaptUnitPrice the value for energy_usage.adapt_unit_price
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public void setAdaptUnitPrice(BigDecimal adaptUnitPrice) {
        this.adaptUnitPrice = adaptUnitPrice;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column energy_usage.energy_cost
     *
     * @return the value of energy_usage.energy_cost
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public BigDecimal getEnergyCost() {
        return energyCost;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column energy_usage.energy_cost
     *
     * @param energyCost the value for energy_usage.energy_cost
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public void setEnergyCost(BigDecimal energyCost) {
        this.energyCost = energyCost;
    }
}