import { useState } from "react";
import { View, Text,KeyboardAvoidingView,Platform,ScrollView,TextInput} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createProjectStyle } from "./CreateProject.style";
import ImagePicker from "../../../components/ImagePicker/ImagePicker";
import Button from "../../../components/Button";
import TasksItem from "./TasksItem";
import uuid from "react-native-uuid";
import { createProjectSchema } from "../../../validation/validationSchemas";

export default function CreateProject() {

  const [backgroundImageUri, setBackgroundImageUri] = useState(null);
  const [iconImageUri, setIconImageUri] = useState(null);

  const [projectName, setProjectName] = useState("");
  const [projectField, setProjectField] = useState("");

  const [projectTaskName, setProjectTaskName] = useState("");
  const [projectTasks, setProjectTasks] = useState([]);

  const [errors, setErrors] = useState({});

  const handleProjectTasks = () => {
    const newTask = {
      id: uuid.v4(),
      title: projectTaskName,
      completed: false,
      completedOn: null,
    };

    setProjectTasks([...projectTasks, newTask]);
    setProjectTaskName("");
    console.log(projectTasks);
  };

  const deleteProjectTaskHandler = (taskId) => {
    setProjectTasks(projectTasks.filter((task) => task.id !== taskId));
  };

  const handleCreateProject = () => {

     setErrors({});
      const result = createProjectSchema.safeParse({
        iconImageUri,
        backgroundImageUri,
        projectName,
        projectField,
        projectTasks,
      });
      
      if (!result.success) {
        const formattedErrors = {};
        
        result.error.issues.forEach((err) => {
          formattedErrors[err.path[0]] = err.message;
        });
        console.log(formattedErrors);
        setErrors(formattedErrors);
        return;
      }

    const newProject = {
        title: projectName,
        field: projectField,
        icon: iconImageUri,
        backgroundImage: backgroundImageUri,
        tasks: projectTasks,
    };
    console.log(newProject);
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["left", "right"]}>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        
        <ScrollView contentContainerStyle={createProjectStyle.scrollViewContent}>

          <View style={{marginBottom:20}}>
            <Text style={createProjectStyle.topText.projects}>Projects</Text>
            <Text style={createProjectStyle.topText.createProject}>
              Create Project
            </Text>
          </View>

          <View style={createProjectStyle.content}>
            <View style={createProjectStyle.group}>
              <Text style={createProjectStyle.group.label}>Select Icon</Text>
              <ImagePicker
                onImagePicked={setIconImageUri}
                imageUri={iconImageUri}
                placeholderText="Select Icon"
                ></ImagePicker>
                {errors.iconImageUri && (<Text style={{ color: "red", fontSize: 12, marginTop: 4,fontWeight:'bold' }}>{errors.iconImageUri}</Text>)}
            </View>

            <View style={createProjectStyle.group}>
              <Text style={createProjectStyle.group.label}>Select Background</Text>
              <ImagePicker
                onImagePicked={setBackgroundImageUri}
                imageUri={backgroundImageUri}
                placeholderText="Select Background Image"
                ></ImagePicker>
                {errors.backgroundImageUri && (<Text style={{ color: "red", fontSize: 12, marginTop: 4,fontWeight:'bold' }}>{errors.backgroundImageUri}</Text>)}
            </View>
          </View>

          <View style={createProjectStyle.groups}>
            <View style={createProjectStyle.group}>
              <Text style={createProjectStyle.group.label}>Project Name</Text>
        
                <TextInput
                  style={createProjectStyle.inputField}
                  placeholder="Enter your projects name..."
                  onChangeText={setProjectName}
                  value={projectName}
                  />
         
                  {errors.projectName && (<Text style={{ color: "red", fontSize: 12, marginTop: 4,fontWeight:'bold' }}>{errors.projectName}</Text>)}
            </View>

            <View style={createProjectStyle.group}>
              <Text style={createProjectStyle.group.label}>Project Field</Text>

              <View>
                <TextInput
                  style={createProjectStyle.inputField}
                  placeholder="Field: Web, Mobile, etc..."
                  onChangeText={setProjectField}
                  value={projectField}
                />
              </View>
              {errors.projectField && (<Text style={{ color: "red", fontSize: 12, marginTop: 4,fontWeight:'bold' }}>{errors.projectField}</Text>)}
            </View>

            <View style={createProjectStyle.group}>
              <Text style={createProjectStyle.group.label}>Project Tasks</Text>

              <View
                style={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 8,
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  <TextInput
                    style={createProjectStyle.inputField}
                    placeholder="Enter your projects tasks..."
                    onChangeText={setProjectTaskName}
                    onSubmitEditing={handleProjectTasks}
                    value={projectTaskName}
                  />

                  <View style={{ width: "15%" }}>
                    <Button
                      title={"+"}
                      style={createProjectStyle}
                      onPress={handleProjectTasks}
                    />
                  </View>
                </View>

                {errors.projectTasks && (<Text style={{ color: "red", fontSize: 12,fontWeight:'bold' }}>{errors.projectTasks}</Text>)}

                <View style={{ flexDirection: "row", gap: 5 }}>
                  {projectTasks.map((task) => (
                    <TasksItem
                      key={task.id}
                      {...task}
                      onDelete={deleteProjectTaskHandler}
                    />
                  ))}
                </View>

                <Button
                  title={"Create Project"}
                  style={createProjectStyle}
                  onPress={handleCreateProject}
                ></Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
