import { Modal, Text, View } from 'react-native';
import {projectDetailsTaskItemModalStyles} from './ProjectDetailsTaskItemModal.style';
import useProjects from '../../../../context/projects/useProjects';
import Button from '../../../../components/Button';

export default function ProjectDetailsTaskItemModal({ visible, onClose,taskData,projectId }) {

    const {updateProjectTasks} = useProjects();

    const competeTaskItemHandler = async () => {
        await updateProjectTasks(projectId, taskData.id)
        onClose();
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={projectDetailsTaskItemModalStyles.centeredView}>
                <View style={projectDetailsTaskItemModalStyles.modalView}>
                    <Text style={projectDetailsTaskItemModalStyles.modalText}>Complete task <Text style={{fontWeight:'bold'}}>"{taskData.title}"</Text> ?</Text>
                       <Text style={{fontSize:20,marginBottom:20}}>Task will be completed on: <Text style={{fontWeight:'bold'}}>{new Date().toLocaleDateString()}</Text></Text> 
                        <Button title="Complete Task" style={projectDetailsTaskItemModalStyles} onPress={competeTaskItemHandler}></Button>
                </View>
            </View>
        </Modal>
    )
}