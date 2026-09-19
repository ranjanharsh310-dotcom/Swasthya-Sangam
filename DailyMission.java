package com.swasthyasangam.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "daily_missions")
public class DailyMission {

    @Id
    private String id;

    private String userId;
    private String missionTitle;
    private String category;
    private String targetMetric;
    private Integer xpReward;
    private Boolean isCompleted = false;
    private LocalDate assignedDate = LocalDate.now();

    public DailyMission() {}

    public DailyMission(String id, String userId, String missionTitle, String category, String targetMetric, Integer xpReward) {
        this.id = id;
        this.userId = userId;
        this.missionTitle = missionTitle;
        this.category = category;
        this.targetMetric = targetMetric;
        this.xpReward = xpReward;
        this.isCompleted = false;
        this.assignedDate = LocalDate.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getMissionTitle() { return missionTitle; }
    public void setMissionTitle(String missionTitle) { this.missionTitle = missionTitle; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getTargetMetric() { return targetMetric; }
    public void setTargetMetric(String targetMetric) { this.targetMetric = targetMetric; }

    public Integer getXpReward() { return xpReward; }
    public void setXpReward(Integer xpReward) { this.xpReward = xpReward; }

    public Boolean getIsCompleted() { return isCompleted; }
    public void setIsCompleted(Boolean isCompleted) { this.isCompleted = isCompleted; }

    public LocalDate getAssignedDate() { return assignedDate; }
    public void setAssignedDate(LocalDate assignedDate) { this.assignedDate = assignedDate; }
}
