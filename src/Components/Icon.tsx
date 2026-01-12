import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


type IconType =
  | 'MaterialIcons'
  | 'Ionicons'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'Entypo'
  | 'AntDesign'
  | 'Feather'
  | 'EvilIcons'
  | 'Octicons'
  | 'MaterialCommunityIcons'
  | 'FontAwesome6';

interface IconProps {
  type: IconType;
  name: string;
  size?: number;
  color?: string;
}

const Icon = ({
  type,
  name,
  size = 24,
  color = '#000',
}: IconProps) => {
  switch (type) {
    case 'MaterialIcons':
      return <MaterialIcons name={name} size={size} color={color} />;
    case 'Ionicons':
      return <Ionicons name={name} size={size} color={color} />;
    case 'FontAwesome':
      return <FontAwesome name={name} size={size} color={color} />;
    case 'FontAwesome5':
      return <FontAwesome5 name={name} size={size} color={color} />;
    case 'Entypo':
      return <Entypo name={name} size={size} color={color} />;
    case 'AntDesign':
      return <AntDesign name={name} size={size} color={color} />;
    case 'Feather':
      return <Feather name={name} size={size} color={color} />;
    case 'EvilIcons':
      return <EvilIcons name={name} size={size} color={color} />;
    case 'Octicons':
      return <Octicons name={name} size={size} color={color} />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons name={name} size={size} color={color} />;
    case 'FontAwesome6':
      return <FontAwesome6 name={name} size={size} color={color} />;
    default:
      return null;
  }
};

export default Icon;
