package kr.re.etri.batis.domain;

import java.math.BigDecimal;
import java.util.Date;

public class RawTagDate {
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column raw_tag_date.measure_date
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    private Date measureDate;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column raw_tag_date.tag_id
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    private String tagId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column raw_tag_date.value
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    private BigDecimal value;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column raw_tag_date.measure_date
     *
     * @return the value of raw_tag_date.measure_date
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public Date getMeasureDate() {
        return measureDate;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column raw_tag_date.measure_date
     *
     * @param measureDate the value for raw_tag_date.measure_date
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public void setMeasureDate(Date measureDate) {
        this.measureDate = measureDate;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column raw_tag_date.tag_id
     *
     * @return the value of raw_tag_date.tag_id
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public String getTagId() {
        return tagId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column raw_tag_date.tag_id
     *
     * @param tagId the value for raw_tag_date.tag_id
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public void setTagId(String tagId) {
        this.tagId = tagId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column raw_tag_date.value
     *
     * @return the value of raw_tag_date.value
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public BigDecimal getValue() {
        return value;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column raw_tag_date.value
     *
     * @param value the value for raw_tag_date.value
     *
     * @mbg.generated Wed Apr 20 10:37:21 KST 2022
     */
    public void setValue(BigDecimal value) {
        this.value = value;
    }
}