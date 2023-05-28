import { observer } from "mobx-react-lite"
import React, {
  useCallback,
  useLayoutEffect,
  useState, 
} from "react"
import { FlatList, TextStyle, View, ViewStyle } from "react-native"
import {
  Button,
  EmptyState,
  Header, HorizontalLine, Screen, Text, TextField, 
} from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { Note, noteRealmContext } from "../models/realm/notes"
const { useQuery, useRealm } = noteRealmContext

interface notesScreenProps extends AppStackScreenProps<"Notes"> {} 

export const NotesScreen = observer(function WelcomeScreen(
  props: notesScreenProps, 
) {
  const { navigation } = props
  const [newNote, setNewNote] = useState("")
  const [error, setError] = useState("")
  const query = useQuery(Note)
  const realm = useRealm()
  const {
    authenticationStore: { setAuthToken, getUserDetails },
  } = useStores()
  
  const logout = useCallback(
    () => {
      realm.write(()=> {
        realm.deleteAll();
      });

      setAuthToken(undefined)
    },
    [realm],
  )

  const handleAddNote = useCallback(
    (newNote) => {
      if (newNote.trim() === "") { 
        setError("error") 
        return
      }
      setError("") 
      realm.write(()=> {
        realm.create('Note', {
          _id: new Realm.BSON.ObjectId(),
          note: newNote, 
          createdAt: new Date()
        });
      });
    },
    [realm],
  )
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header rightTx="welcomeScreen.headerRight" onRightPress={logout} />,
    })
  }, [])
  
  return (
    <Screen
      preset="fixed"
      contentContainerStyle={$screenContentContainer}
    >
      <Text tx="loginScreen.enterDetails" preset="subheading" style={$enterDetails} />
      <Text text={getUserDetails} preset="default" style={$enterDetails} />
      
      <TextField
        value={newNote}
        onChangeText={setNewNote}
        containerStyle={$textField}
        autoComplete="email"
        autoCorrect={false}
        labelTx="welcomeScreen.note"
        placeholderTx="welcomeScreen.noteFieldPlaceholder"
        multiline={true}
        status={error ? "error" : undefined}
        helperTx={error && "errors.invalidNotes"}
      />

      <Button
        testID="notes-button"
        tx="welcomeScreen.addNote"
        style={$tapButton}
        preset="reversed"
        onPress={() => handleAddNote(newNote)}
      />
        
      <HorizontalLine />

      <FlatList<{ _id: any,  note: string, createdAt: Date }>
        contentContainerStyle={$noteListContainer}
        data={query.sorted("createdAt", true)}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={$noteListItem}>
              <Text preset="subheading">
                {item.note}
              </Text>
              <Text text={item.createdAt.toLocaleString()}  preset="default" />
          </View>
        )}
        ListEmptyComponent={
            <EmptyState
              preset="generic"
              style={$emptyState}
              headingTx={"emptyStateComponent.generic.heading"}
              contentTx={"emptyStateComponent.generic.content"}
              ImageProps={{ resizeMode: "contain" }}
              button=""
            />
        }
      />
  </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingHorizontal: spacing.large,
  flex: 1
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.medium,
}

const $textField: ViewStyle = {
  marginBottom: spacing.large,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.extraSmall,
}

const $noteListContainer: ViewStyle = {
  paddingBottom: spacing.medium, 
  paddingTop: spacing.medium
}

const $noteListItem: ViewStyle = {
  borderRadius: spacing.small,
  borderColor: colors.palette.neutral900,
  borderWidth: spacing.micro,
  padding: spacing.small, 
  marginTop: spacing.medium
}

const $emptyState: ViewStyle = {
  marginTop: spacing.large,
}
