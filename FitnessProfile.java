package com.swasthyasangam.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "fitness_profiles")
public class FitnessProfile {

    @Id
    private String userId;

    private LocalDate dob;
    private Integer age;
    private String gender;
    private Double heightCm;
    private Double weightKg;
    private Double bmi;
    private String fitnessLevel;
    private String primaryGoal;

    @ElementCollection
    @CollectionTable(name = "user_skills", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "skill_name")
    private List<String> selectedSkills;

    public FitnessProfile() {}

    public FitnessProfile(String userId, LocalDate dob, Integer age, String gender, Double heightCm, Double weightKg, Double bmi, String fitnessLevel, String primaryGoal, List<String> selectedSkills) {
        this.userId = userId;
        this.dob = dob;
        this.age = age;
        this.gender = gender;
        this.heightCm = heightCm;
        this.weightKg = weightKg;
        this.bmi = bmi;
        this.fitnessLevel = fitnessLevel;
        this.primaryGoal = primaryGoal;
        this.selectedSkills = selectedSkills;
    }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public LocalDate getDob() { return dob; }
    public void setDob(LocalDate dob) { this.dob = dob; }

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public Double getHeightCm() { return heightCm; }
    public void setHeightCm(Double heightCm) { this.heightCm = heightCm; }

    public Double getWeightKg() { return weightKg; }
    public void setWeightKg(Double weightKg) { this.weightKg = weightKg; }

    public Double getBmi() { return bmi; }
    public void setBmi(Double bmi) { this.bmi = bmi; }

    public String getFitnessLevel() { return fitnessLevel; }
    public void setFitnessLevel(String fitnessLevel) { this.fitnessLevel = fitnessLevel; }

    public String getPrimaryGoal() { return primaryGoal; }
    public void setPrimaryGoal(String primaryGoal) { this.primaryGoal = primaryGoal; }

    public List<String> getSelectedSkills() { return selectedSkills; }
    public void setSelectedSkills(List<String> selectedSkills) { this.selectedSkills = selectedSkills; }
}
