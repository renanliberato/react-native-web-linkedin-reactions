import React, { Component } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from "react-native";
import { icons } from "./icons";

const TabButton = ({ image, title, selected, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      height: 50,
      width: 80,
      alignItems: "center",
      justifyContent: "space-between"
    }}
  >
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 16
      }}
    >
      {image && (
        <Image
          source={image}
          style={{
            width: 20,
            height: 20,
            marginRight: 5
          }}
        />
      )}
      <Text
        style={[
          styles.primaryText,
          {
            color: "blue"
          }
        ]}
      >
        {title}
      </Text>
    </View>
    {selected && (
      <View
        style={{
          height: 5,
          alignSelf: "stretch",
          backgroundColor: "blue"
        }}
      />
    )}
  </TouchableOpacity>
);

const UserItem = ({ user }) => (
  <View
    style={{
      paddingTop: 10,
      paddingLeft: 30,
      paddingRight: 30,
      flexDirection: "row"
    }}
  >
    <View
      style={{
        height: 50,
        width: 50,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 5
      }}
    >
      <Image
        style={{
          height: 40,
          width: 40,
          borderRadius: 25
        }}
        source={{
          uri: user.photoUrl
        }}
      />
      <View
        style={{
          height: 15,
          width: 15,
          borderRadius: 7,
          position: "absolute",
          bottom: 5,
          right: 5,
          backgroundColor: "#FFFFFF",
          borderWidth: 0.1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Image
          style={{
            height: 10,
            width: 10,
            borderRadius: 5
          }}
          source={{
            uri: user.reaction === "like" ? icons.like : icons.love
          }}
        />
      </View>
    </View>
    <View
      style={{
        paddingTop: 5,
        flex: 1
      }}
    >
      <Text style={[styles.primaryText, { marginLeft: 5 }]}>
        {user.name} -&nbsp;
        <Text style={styles.descriptionText}>{user.connectionLevel}</Text>
      </Text>
      <Text
        style={[
          styles.descriptionText,
          {
            marginTop: 5,
            marginLeft: 5
          }
        ]}
      >
        {user.summary}
      </Text>
      <View
        style={{
          marginTop: 10,
          height: 1,
          opacity: 0.5,
          backgroundColor: "grey"
        }}
      />
    </View>
  </View>
);

class App extends Component {
  state = {
    users: [
      {
        id: 1,
        name: "Joao",
        reaction: "love",
        photoUrl: "https://randomuser.me/api/portraits/men/51.jpg",
        summary: "Developer",
        connectionLevel: "1st"
      },
      {
        id: 2,
        name: "Maria",
        reaction: "like",
        photoUrl: "https://randomuser.me/api/portraits/women/51.jpg",
        summary: "Software Engineer",
        connectionLevel: "2nd"
      },
      {
        id: 3,
        name: "Gabriela",
        reaction: "like",
        photoUrl: "https://randomuser.me/api/portraits/women/52.jpg",
        summary: "Architect",
        connectionLevel: "1st"
      },
      {
        id: 4,
        name: "Beatriz",
        reaction: "love",
        photoUrl: "https://randomuser.me/api/portraits/women/53.jpg",
        summary: "Infrastructure Engineer",
        connectionLevel: "1st"
      },
      {
        id: 5,
        name: "Jonas",
        reaction: "love",
        photoUrl: "https://randomuser.me/api/portraits/men/53.jpg",
        summary: "Artist",
        connectionLevel: "1st"
      }
    ],
    selectedTab: "all"
  };

  render() {
    var usersWhoLiked = this.state.users.filter(u => u.reaction === "like");
    var usersWhoLoved = this.state.users.filter(u => u.reaction === "love");
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            height: 50,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 20
          }}
        >
          <Text style={styles.title}>Reactions</Text>
          <TouchableOpacity>
            <Text style={styles.title}>X</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start"
          }}
        >
          <TabButton
            title={"All " + this.state.users.length}
            selected={this.state.selectedTab === "all"}
            onPress={() => this.setState({ selectedTab: "all" })}
          />
          <TabButton
            image={{ uri: icons.like }}
            title={usersWhoLiked.length}
            selected={this.state.selectedTab === "like"}
            onPress={() => this.setState({ selectedTab: "like" })}
          />
          <TabButton
            image={{ uri: icons.love }}
            title={usersWhoLoved.length}
            selected={this.state.selectedTab === "love"}
            onPress={() => this.setState({ selectedTab: "love" })}
          />
        </View>
        <View
          style={{
            height: 1,
            alignSelf: "stretch",
            opacity: 0.5,
            backgroundColor: "grey"
          }}
        />
        <ScrollView>
          {this.state.selectedTab === "all" &&
            this.state.users.map(u => <UserItem key={u.id} user={u} />)}
          {this.state.selectedTab === "like" &&
            usersWhoLiked.map(u => <UserItem key={u.id} user={u} />)}
          {this.state.selectedTab === "love" &&
            usersWhoLoved.map(u => <UserItem key={u.id} user={u} />)}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20
  },
  primaryText: {
    fontSize: 16
  },
  descriptionText: {
    fontSize: 14,
    color: "grey"
  }
});

export default App;
