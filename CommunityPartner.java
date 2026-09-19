package com.swasthyasangam.model;

import jakarta.persistence.*;

@Entity
@Table(name = "community_partners")
public class CommunityPartner {

    @Id
    private String id;

    private String name;
    private Integer age;
    private String locationName;
    private Double latitude;
    private Double longitude;
    private String primarySport;
    private String fitnessLevel;
    private String bio;
    private String avatarUrl;

    public CommunityPartner() {}

    public CommunityPartner(String id, String name, Integer age, String locationName, Double latitude, Double longitude, String primarySport, String fitnessLevel, String bio, String avatarUrl) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.locationName = locationName;
        this.latitude = latitude;
        this.longitude = longitude;
        this.primarySport = primarySport;
        this.fitnessLevel = fitnessLevel;
        this.bio = bio;
        this.avatarUrl = avatarUrl;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }

    public String getLocationName() { return locationName; }
    public void setLocationName(String locationName) { this.locationName = locationName; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }

    public String getPrimarySport() { return primarySport; }
    public void setPrimarySport(String primarySport) { this.primarySport = primarySport; }

    public String getFitnessLevel() { return fitnessLevel; }
    public void setFitnessLevel(String fitnessLevel) { this.fitnessLevel = fitnessLevel; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
}
