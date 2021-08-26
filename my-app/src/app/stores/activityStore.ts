import { makeAutoObservable } from "mobx";
import { Activity } from "../models/activity";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

axios.defaults.baseURL = "http://localhost:5000";

export default class activityStore {
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode = false;

  constructor() {
    makeAutoObservable(this);
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  get groupListActivity(){
    return Object.entries(
      this.activitiesByDate.reduce((activities, activity) => {
        const date = activity.date;
        activities[date] = activities[date] ? [...activities[date],activity] : [activity];
        return activities;
      }, {} as {[key : string] : Activity[]} )
    )
  
    
    
  }
  loadActivities = async () => {
    try {
      const activities = await axios
        .get("/api/activities")
        .then(function (response) {
          return response.data;
        });
      activities.forEach((activity: Activity) => {
        activity.date = activity.date.split("T")[0];
        this.activityRegistry.set(activity.id, activity);
      });
    } catch (error) {
      console.log(error);
    }
  };

  loadActivity = async (id : string) => {
    let activity = this.activityRegistry.get(id);
    console.log(activity);
    if(activity){
      this.selectedActivity = activity;
      console.log(activity);
      return activity;
    }
    else {
      try{
        activity =  await axios.get(`/api/activities/${id}`).then(function (response){
          return response.data;
        });
        if(activity){
          activity.date = activity.date.split('T')[0];
          this.activityRegistry.set(activity.id, activity);
          this.selectedActivity = activity;
          return activity;
        }
        else{
          this.selectedActivity = undefined;
        }
      }
      catch(error){
        console.log(error);
      }
  
    }
  }

  setSelectedActivity = (id : string) =>{
      this.selectedActivity = this.activityRegistry.get(id);
  }

  setCancelSelectedActivity = () => {
        this.selectedActivity = undefined;
  }

  openForm = (id? : string) => {
      id ? this.setSelectedActivity(id) : this.setCancelSelectedActivity();
      this.editMode = true;
  }

  closeForm = () => {
      this.selectedActivity = undefined;
      this.editMode = false;
  }

  createActivity = (activity : Activity) => {
      activity.id = uuidv4();
      try{
        axios.post(`/api/activities`, activity).then(function (response) {
            console.log(response);
          });
          this.activityRegistry.set(activity.id, activity);
          this.selectedActivity = activity;
          this.editMode = false;

      }
      catch(error){
          console.log(error);
      }
  }

  updateActivity = (activity : Activity) => {
    try{
        axios.put(`/api/activities/${activity.id}`, activity).then(function (response) {
            console.log(response);
          });
          this.activityRegistry.set(activity.id, activity);
          this.selectedActivity = activity;
          this.editMode = false;

      }
      catch(error){
          console.log(error);
      }
  }

  deleteActivity = (id : string) => {
      try{
          axios.delete(`api/activities/${id}`).then(function(response){
              console.log(response);
          });
          this.activityRegistry.delete(id);
      }
      catch(error){
          console.log(error);
      }
  }
}
