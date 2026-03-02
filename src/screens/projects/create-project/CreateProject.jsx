import { useState } from "react";
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TextInput, ActivityIndicator} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createProjectStyle } from "./CreateProject.style";
import { createProjectSchema } from "../../../validation/validationSchemas";
import { uploadImageToCloudinary } from "../../../services/cloudinary/uploadImageToCloudinary";
import { useNavigation } from "@react-navigation/native";
import ImagePicker from "../../../components/ImagePicker/ImagePicker";
import Button from "../../../components/Button";
import TasksItem from "./TasksItem";
import checkValidation from "../../../validation/checkValidation";
import uuid from "react-native-uuid";
import useAuth from "../../../context/auth/useAuth";
import useProjects from "../../../context/projects/useProjects";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useHeaderHeight } from '@react-navigation/elements';

export default function CreateProject() {
  const { user } = useAuth();
  const { error, clearError, createNewProjects } = useProjects();

  const headerHeight = useHeaderHeight();

  const [backgroundImageUri, setBackgroundImageUri] = useState(null);
  const [iconImageUri, setIconImageUri] = useState(null);

  const [projectName, setProjectName] = useState("");
  const [projectField, setProjectField] = useState("");

  const [projectTaskName, setProjectTaskName] = useState("");
  const [projectTasks, setProjectTasks] = useState([]);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [deadline, setDeadline] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const navigation = useNavigation();

  const handleProjectTasks = () => {

    if (projectTaskName.length < 3) {
    setErrors((prev) => ({ ...prev, projectTaskName: "Project task field must be at least 3 characters" }));
    return;
  }

  setErrors((prev) => ({ ...prev, projectTaskName: null }));

    const newTask = {
      id: uuid.v4(),
      title: projectTaskName,
      completed: false,
      completedOn: null,
    };

    setProjectTasks((prevTasks) => [...prevTasks, newTask]);
    setProjectTaskName("");
  };

  const deleteProjectTaskHandler = (taskId) => {
    setProjectTasks(projectTasks.filter((task) => task.id !== taskId));
  };

  const handleDeadlineChange = (event, selectedDate) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (event?.type === "set" && selectedDate) {
      setDeadline(selectedDate);
    }
  };

  const handleCreateProject = async () => {
    setErrors({});
    clearError();

    const validation = checkValidation(createProjectSchema.omit({ projectTaskName: true }), {
      iconImageUri,
      backgroundImageUri,
      projectName,
      projectField,
      deadline,
      projectTasks,
    });

    if (!validation.success) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);

    const newProject = {
      title: projectName,
      field: projectField,
      completed: false,
      icon: await uploadImageToCloudinary(iconImageUri),
      backgroundImage: await uploadImageToCloudinary(backgroundImageUri),
      deadline: deadline ? deadline.toISOString() : null,
      tasks: projectTasks,
    };

    await createNewProjects(user.id, newProject);

    setLoading(false);
    setIconImageUri(null);
    setBackgroundImageUri(null);
    setProjectName("");
    setProjectField("");
    setProjectTasks([]);
    setDeadline(new Date());
    navigation.navigate("Milestones", { screen: "ActiveMilestones" });
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator size="large" color="#5458b5" style={{ flex: 1, justifyContent: "center", alignItems: "center" }}/>
      ) : (
        <SafeAreaView style={{ flex: 1 }} edges={["left", "right"]}>
          <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={Platform.OS === "ios" ? headerHeight : 0} behavior={Platform.OS === "ios" ? "padding" : undefined}>

            <ScrollView contentContainerStyle={createProjectStyle.scrollViewContent}>

              <View style={{ marginBottom: 20 }}>
                <Text style={createProjectStyle.topText.projects}>
                  Projects
                </Text>
                <Text style={createProjectStyle.topText.createProject}>
                  Create Project
                </Text>
                {error.createError && <Text style={{ color: "red", fontWeight:'bold',fontSize:18 }}>{error.createError}</Text>}
              </View>

              <View style={createProjectStyle.content}>

                <View style={createProjectStyle.group}>

                  <Text style={createProjectStyle.group.label}>
                    Select Icon
                  </Text>

                  <ImagePicker onImagePicked={setIconImageUri} imageUri={iconImageUri} placeholderText="Select Icon" ></ImagePicker>
                  
                  {errors.iconImageUri && (
                    <Text style={createProjectStyle.error}>
                      {errors.iconImageUri}
                    </Text>
                  )}
                </View>

                <View style={createProjectStyle.group}>

                  <Text style={createProjectStyle.group.label}>
                    Select Background
                  </Text>

                  <ImagePicker onImagePicked={setBackgroundImageUri} imageUri={backgroundImageUri} placeholderText="Select Background Image"></ImagePicker>
                  
                  {errors.backgroundImageUri && (
                    <Text style={createProjectStyle.error}>
                      {errors.backgroundImageUri}
                    </Text>
                  )}

                </View>
              </View>

              <View style={createProjectStyle.groups}>

                <View style={createProjectStyle.group}>

                  <Text style={createProjectStyle.group.label}>
                    Project Name
                  </Text>

                  <TextInput style={createProjectStyle.inputField} placeholder="Enter your projects name..." onChangeText={setProjectName} value={projectName}/>

                  {errors.projectName && (
                    <Text style={createProjectStyle.error}>
                      {errors.projectName}
                    </Text>
                  )}

                </View>

                <View style={createProjectStyle.group}>
                  <Text style={createProjectStyle.group.label}>
                    Project Field
                  </Text>

                  <View>
                    <TextInput style={createProjectStyle.inputField} placeholder="Field: Web, Mobile, etc..." onChangeText={setProjectField} value={projectField}/>
                  </View>

                  {errors.projectField && (
                    <Text style={createProjectStyle.error}>
                      {errors.projectField}
                    </Text>
                  )}
                </View>

                <View style={createProjectStyle.group}>
                  <Text style={createProjectStyle.group.label}>
                    Project Tasks
                  </Text>

                  <View style={{ flexDirection: "column", alignItems: "flex-start",gap: 8}}>
                    <View style={{flexDirection: "row", alignItems: "center", gap: 8}}>

                      <TextInput
                        style={createProjectStyle.inputField}
                        placeholder="Enter your projects tasks..."
                        onChangeText={setProjectTaskName}
                        onSubmitEditing={handleProjectTasks}
                        value={projectTaskName}
                      />

                      <View style={{ width: "15%" }}>
                        <Button title={"+"} style={createProjectStyle} onPress={handleProjectTasks}/>
                      </View>
                    </View>

                    {errors.projectTasks && (
                      <Text style={createProjectStyle.error}>
                        {errors.projectTasks}
                      </Text>
                    )}

                    {errors.projectTaskName && (
                      <Text style={createProjectStyle.error}>
                        {errors.projectTaskName}
                      </Text>
                    )}

                    <View style={{ flexDirection: "row", gap: 5,flexWrap: "wrap",marginBottom:5 }}>
                      {projectTasks.map((task) => (
                        <TasksItem
                          key={task.id}
                          {...task}
                          onDelete={deleteProjectTaskHandler}
                        />
                      ))}
                    </View>
                  </View>

                  <View style={createProjectStyle.group}>

                    <Text style={createProjectStyle.group.label}>
                      Project Deadline
                    </Text>

                    <View style={{flexDirection: "column", alignItems: "flex-start",gap: 8}}>
                      <View style={{flexDirection: "row", alignItems: "center",gap: 8}}>
                        
                        <TextInput
                          style={createProjectStyle.inputField}
                          placeholder="Select a deadline..."
                          editable={false}
                          value={deadline ? deadline.toLocaleDateString() : ""}
                        />

                        <View style={{ width: "15%" }}>
                          <Button title="+" style={createProjectStyle} onPress={() => setShowDatePicker(true)}></Button>
                        </View>
                      </View>

                      <View style={{justifyContent: "center",alignItems: "center",width:"100%"}}>
                         {showDatePicker && (
                          <DateTimePicker
                            value={deadline}
                            mode="date"
                            display="spinner"
                            onChange={handleDeadlineChange}
                          ></DateTimePicker>
                        )}
                        
                      </View>

                      {errors.deadline && (
                        <Text style={createProjectStyle.error}>
                          {errors.deadline}
                        </Text>
                      )}

                      <Button title={"Create Project"} style={createProjectStyle} onPress={handleCreateProject}></Button>

                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      )}
    </>
  );
}
