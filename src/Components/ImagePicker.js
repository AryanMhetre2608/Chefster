import React from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import {
  requestCameraPermission,
  requestGalleryPermission,
} from '../utils/Permissions';

const MAX_SIZE = 10 * 1024 * 1024; // 10MB

const ImagePicker = ({
  visible,
  onClose,
  onPick,
  showDelete = false,
}) => {
  const config = {
    mediaType: 'photo',
    compressImageQuality: 0.8,
    maxWidth: 1920,
    maxHeight: 1920,
    compressImageMaxWidth: 1920,
    compressImageMaxHeight: 1920,
    includeBase64: false,
    forceJpg: true,
    cropping: false,
  };

  /* ---------- IMAGE PROCESS ---------- */
  const processImage = img => {
    if (!img?.path) throw new Error('Invalid image');
    if (!img.mime?.startsWith('image/')) throw new Error('Invalid file type');
    if (img.size > MAX_SIZE)
      throw new Error('Image too large (10MB max)');

    const ext =
      img.mime.includes('png')
        ? 'png'
        : img.mime.includes('webp')
        ? 'webp'
        : 'jpg';

    return {
      uri: img.path,
      type: img.mime,
      name: `img_${Date.now()}.${ext}`,
      width: img.width,
      height: img.height,
      size: img.size,
    };
  };

  /* ---------- GALLERY ---------- */
  const openGallery = async () => {
    try {
      if (Platform.OS === 'android') {
        const allowed = await requestGalleryPermission();
        if (!allowed) return;
      }

      const img = await ImageCropPicker.openPicker(config);
      onPick(processImage(img));
    } catch (e) {
      if (e.code !== 'E_PICKER_CANCELLED') {
        Alert.alert('Error', e.message || 'Gallery error');
      }
    } finally {
      onClose();
    }
  };

  /* ---------- CAMERA ---------- */
  const openCamera = async () => {
    try {
      if (Platform.OS === 'android') {
        const allowed = await requestCameraPermission();
        if (!allowed) return;
      }

      const img = await ImageCropPicker.openCamera(config);
      onPick(processImage(img));
    } catch (e) {
      if (e.code !== 'E_PICKER_CANCELLED') {
        Alert.alert('Error', e.message || 'Camera error');
      }
    } finally {
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.sheet}>
          <Text style={styles.title}>Select Image</Text>

          <PickerButton text="📁 Gallery" onPress={openGallery} />
          <PickerButton text="📷 Camera" onPress={openCamera} />

          {showDelete && (
            <PickerButton
              text="🗑️ Delete"
              danger
              onPress={() => {
                onPick('');
                onClose();
              }}
            />
          )}

          <PickerButton text="Cancel" onPress={onClose} />
        </View>
      </Pressable>
    </Modal>
  );
};

/* ---------- BUTTON ---------- */
const PickerButton = ({ text, onPress, danger }) => (
  <Pressable
    onPress={onPress}
    style={[styles.button, danger && styles.danger]}>
    <Text style={[styles.buttonText, danger && styles.dangerText]}>
      {text}
    </Text>
  </Pressable>
);

export default ImagePicker;

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  buttonText: {
    fontSize: 16,
    color: '#222',
  },
  danger: {
    borderBottomWidth: 0,
  },
  dangerText: {
    color: 'red',
  },
});
