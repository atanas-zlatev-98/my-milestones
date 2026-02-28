import { Modal, Pressable, Text, View } from 'react-native';
import {projectDetailsTaskItemModalStyles} from './ProjectDetailsTaskItemModal.style';

export default function ProjectDetailsTaskItemModal({ visible, onClose,taskData }) {
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
                    <Pressable
                        style={[projectDetailsTaskItemModalStyles.button, projectDetailsTaskItemModalStyles.buttonClose]}
                        onPress={onClose}
                    >
                        <Text style={projectDetailsTaskItemModalStyles.textStyle}>Hide Modal</Text>
                        <Text>{taskData.id}</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}