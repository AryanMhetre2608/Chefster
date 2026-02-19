import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

import i18n from '../locales/i18n'
const ChangePassword = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  useEffect(() => {
  i18n.changeLanguage(selectedLanguage);
}, [selectedLanguage]);

  return (
    <View style={styles.container}>
      <Header
        title="Language"
        titleStyle={{ fontWeight: 'bold', fontSize: 24 }}
      />
      <View style={styles.overlappingContainer}>
        <View
          style={{
            width: '100%',
            height: 20,
            marginVertical: 20,
            gap: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              width: '85%',
              height: 400,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 160,
              borderRadius: 25,
              elevation: 10,
            }}
          >




            
            <Pressable
            onPress={()=>{
                    setSelectedLanguage('en')
                    i18n.changeLanguage('en');
                }}
              style={{
                height: '20%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}
            >
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '15%',
                }}
              >
                <Text style={{ fontSize: 20 }}>English</Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '15%',
                }}
              >
                <View>
                  {selectedLanguage === 'en' ? (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 28,
                        width: 28,
                        borderRadius: 14,
                        backgroundColor: '#FF6A00',
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: 'white',
                          height: 10,
                          width: 10,
                          borderRadius: 5,
                        }}
                      />
                    </View>
                  ) : (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 28,
                        width: 28,
                        borderWidth: 1,
                        borderColor: 'black',
                        borderRadius: 14,
                      }}
                    />
                  )}
                </View>
              </View>
            </Pressable>




            <Pressable
            onPress={()=>{
                   setSelectedLanguage('hi')
                   i18n.changeLanguage('hi');
                }}
              style={{
                height: '20%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}
            >
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '15%',
                }}
              >
                <Text style={{ fontSize: 20 }}>Hindi (हिन्दी)</Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '15%',
                }}
              >
                <View
                >
                  {selectedLanguage === 'hi' ? (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 28,
                        width: 28,
                        borderRadius: 14,
                        backgroundColor: '#FF6A00',
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: 'white',
                          height: 10,
                          width: 10,
                          borderRadius: 5,
                        }}
                      />
                    </View>
                  ) : (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 28,
                        width: 28,
                        borderWidth: 1,
                        borderColor: 'black',
                        borderRadius: 14,
                      }}
                    />
                  )}
                </View>
              </View>
            </Pressable>




            <Pressable
             onPress={()=>{
                    setSelectedLanguage('mr')
                    i18n.changeLanguage('mr');
                }}
              style={{
                height: '20%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}
            >
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '15%',
                }}
              >
                <Text style={{ fontSize: 20 }}>Marathi (मराठी)</Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '15%',
                }}
              >
                <View
               >
                 {selectedLanguage === 'mr' ? (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 28,
                        width: 28,
                        borderRadius: 14,
                        backgroundColor: '#FF6A00',
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: 'white',
                          height: 10,
                          width: 10,
                          borderRadius: 5,
                        }}
                      />
                    </View>
                  ) : (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 28,
                        width: 28,
                        borderWidth: 1,
                        borderColor: 'black',
                        borderRadius: 14,
                      }}
                    />
                  )}
                </View>
              </View>
            </Pressable>




            <Pressable
            onPress={()=>{
                   setSelectedLanguage('ta')
                   i18n.changeLanguage('ta');
                }}
              style={{
                height: '20%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}
            >
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '15%',
                }}
              >
                <Text style={{ fontSize: 20 }}>Tamil (தமிழ்)</Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '15%',
                }}
              >
                <View
                >
                 {selectedLanguage === 'ta' ? (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 28,
                        width: 28,
                        borderRadius: 14,
                        backgroundColor: '#FF6A00',
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: 'white',
                          height: 10,
                          width: 10,
                          borderRadius: 5,
                        }}
                      />
                    </View>
                  ) : (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 28,
                        width: 28,
                        borderWidth: 1,
                        borderColor: 'black',
                        borderRadius: 14,
                      }}
                    />
                  )}
                </View>
              </View>
            </Pressable>




            <Pressable
             onPress={()=>{
                   setSelectedLanguage('te')
                   i18n.changeLanguage('te');
                }}
              style={{
                height: '20%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}
            >
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '15%',
                }}
              >
                <Text style={{ fontSize: 20 }}>Telugu (తెలుగు)</Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '15%',
                }}
              >
                <View
               >
                 {selectedLanguage === 'te' ? (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 28,
                        width: 28,
                        borderRadius: 14,
                        backgroundColor: '#FF6A00',
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: 'white',
                          height: 10,
                          width: 10,
                          borderRadius: 5,
                        }}
                      />
                    </View>
                  ) : (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 28,
                        width: 28,
                        borderWidth: 1,
                        borderColor: 'black',
                        borderRadius: 14,
                      }}
                    />
                  )}
                </View>
              </View>
            </Pressable>






          </View>
        </View>
      </View>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor will be set inline with theme colors
  },
  overlappingContainer: {
    alignItems: 'center',
    flex: 1,
    // backgroundColor will be set inline with theme colors
    borderTopRightRadius: 45,
    borderTopLeftRadius: 45,
    zIndex: 10,
    elevation: 7,
    justifyContent: 'center',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  loadingContent: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
});
