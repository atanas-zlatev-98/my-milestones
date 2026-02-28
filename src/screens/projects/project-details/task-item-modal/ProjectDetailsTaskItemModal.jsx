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
                    <Text style={projectDetailsTaskItemModalStyles.modalText}>Hello World!</Text>
                        <Text style={projectDetailsTaskItemModalStyles.textStyle}>Hide Modal</Text>
                        <Text>{taskData.id}</Text>
                        <Button title="Complete Task" style={projectDetailsTaskItemModalStyles} onPress={competeTaskItemHandler}></Button>
                </View>
            </View>
        </Modal>
    )
}