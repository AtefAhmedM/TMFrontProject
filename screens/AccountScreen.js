import React from 'react';
import { ScrollView, StyleSheet, View, Text, Image, StatusBar, TouchableOpacity, SafeAreaView } from 'react-native';
import TopNavigation from '../navigation/TopNavigation';

const YourComponent = () => {

  return (
    <SafeAreaView style={styles.outerContainer}>
      <TopNavigation />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        
        <View style={styles.accountContainer}>
          <StatusBar barStyle="dark-content" />
          <View style={styles.profile}>
            <View style={styles.profileTop}>
              <View style={styles.avatar}>
                <Image
                  alt=""
                  source={require('../assets/profile.jpg')}
                  style={styles.avatarImg}
                />
                <View style={styles.avatarNotification} />
              </View>

              <View style={styles.profileBody}>
                <Text style={styles.profileTitle}>{'UserInfo\nName'}</Text>
                <Text style={styles.profileSubtitle}>
                  Computer Engineer
                  {' · '}
                  <Text style={{ color: '#266EF1',fontFamily: "NotoSans" }}>Time Studio</Text>
                </Text>
              </View>
            </View>

            <Text style={styles.profileDescription}>
              Skilled in user research, wireframing, prototyping, and
              collaborating with cross-functional teams.
            </Text>

            <View style={styles.profileTags}>
              {['ios', 'android', 'web', 'ui', 'ux'].map((tag, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    // handle onPress
                  }}>
                  <Text style={styles.profileTagsItem}>#{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <Text style={styles.TaskTitle}>
          Tasks Overview
        </Text>       

        {/* Completion Weekly */}
        <View style={[styles.container, styles.elevation, styles.roundedContainer, styles.largeContainer]}>
          <Text style={styles.title}>Completion Weekly</Text>
          <Image
            source={require('../assets/Graph.png')}
            style={styles.GraphImg}
          />
        </View>

        {/* Completion and Pending Task side by side */}
        <View style={[styles.halfWidthContainer, styles.elevation]}>
          <View style={[styles.container, styles.halfWidth, styles.roundedContainer, styles.largeContainer, styles.marginRight]}>
            <Text style={styles.completionNumber}> 5 </Text>
            <Text style={styles.title}>Completion</Text>
          </View>
          <View style={[styles.container, styles.halfWidth, styles.roundedContainer, styles.largeContainer, styles.marginLeft]}>
            <Text style={styles.completionNumber}> 0 </Text>
            <Text style={styles.title}>Pending Task</Text>
          </View>
        </View>

        {/* Pending in Categories */}
        <View style={[styles.container, styles.elevation, styles.roundedContainer, styles.largeContainer]}>
          <Text style={styles.title}>Pending in Categories</Text>
          <Image
            source={require('../assets/Graph2.png')}
            style={styles.GraphImg2}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollViewContainer: {
    flexGrow: 1,
    padding: 16,
  },
  accountContainer: {
    marginBottom: 20,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#F9F9F9',
    elevation: 10,
  }, 
  elevation: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 0.1,
    elevation: 0,
  },
  roundedContainer: {
    borderRadius: 30,
    elevation: 10,
  },
  largeContainer: {
    height: 200, // Adjust the height as needed
  },
  title: {
    fontFamily: 'KottaOne',
    fontSize: 20,
  },
  TaskTitle:{
    fontSize: 16,
    fontWeight: '500',
    fontFamily: "KottaOne",
    color: '#778599',
    marginBottom:  10,
  },
  completionNumber: {
    fontSize: 34,
    
    marginBottom: 10,
  },
  halfWidthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    flex: 0.48,
    height: '100%', // Set the height to 100% to fill the available space
  },
  marginRight: {
    marginRight: 10,
  },
  marginLeft: {
    marginLeft: 10,
  },
  profileTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  profileBody: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingLeft: 16,
  },
  profileTitle: {
    fontSize: 24,
    fontFamily: "KottaOne",
    lineHeight: 32,
    color: '#121a26',
    marginBottom: 6,
  },
  profileSubtitle: {
    fontFamily: "NotoSans",
    fontSize: 12,
    fontWeight: '600',
    color: '#778599',
  },
  profileDescription: {
    fontSize: 12,
    fontFamily: "NotoSans",
    lineHeight: 18,
    color: '#778599',
  },
  profileTags: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileTagsItem: {
    fontSize: 12,
    fontFamily: "NotoSans",
    fontWeight: '600',
    lineHeight: 18,
    color: '#266ef1',
    marginRight: 4,
  },
  avatar: {
    position: 'relative',
  },
  avatarImg: {
    width: 80,
    height: 80,
    borderRadius: 9999,
  },
  GraphImg: {
    width: 300,
    height: 150,
    padding: 5,
    resizeMode: 'contain',
  },
  GraphImg2: {
    width: 350,
    height: 150,
    padding: 10,
    top: 10,
    resizeMode: 'contain',
  },
  avatarNotification: {
    position: 'absolute',
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#fff',
    bottom: 0,
    right: -2,
    width: 21,
    height: 21,
    backgroundColor: '#22C55E',
  },
  profile: {
    backgroundColor: '#fff',
    padding: 24,
  },
});

export default YourComponent;
