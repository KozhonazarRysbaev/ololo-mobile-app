import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import BottomSheet from 'reanimated-bottom-sheet'
import Animated from 'react-native-reanimated'

import EventFeedbackRateButton, {
  HEIGHT as RATE_BUTTON_HEIGHT
} from './EventFeedbackRateButton'
import EventFeedbackForm from './EventFeedbackForm'
import EventFeedbackSuccess from './EventFeedbackSuccess'

import { colors } from '../util/style'

export const SHEET_TOP_MARGIN = 120
const BORDER_RADIUS = 20
const DRAG_INDICATOR_HEIGHT = 4
const HEADER_HEIGHT = BORDER_RADIUS + DRAG_INDICATOR_HEIGHT

interface Props {
  eventId: string
  eventTitle: string
  onDismiss: () => void
}

function EventFeedbackSheet({ eventId, eventTitle, onDismiss }: Props) {
  const sheetRef = React.useRef()
  const [bottomSheetY] = React.useState(new Animated.Value(1))
  const [isSubmitted, setSubmittedState] = React.useState(false)
  const { height: screenHeight } = Dimensions.get('screen')
  const rateButtonOpacity = bottomSheetY.interpolate({
    inputRange: [0.8, 1],
    outputRange: [0, 1]
  })
  const contentOpacity = bottomSheetY.interpolate({
    inputRange: [0, 0.8],
    outputRange: [1, 0]
  })
  const minHeight = screenHeight - SHEET_TOP_MARGIN - HEADER_HEIGHT

  function handleRateButtonPress() {
    if (sheetRef.current) {
      sheetRef.current.snapTo(1)
    }
  }

  function handleSubmit(values) {
    console.log({ values })
    setSubmittedState(true)
  }

  function handleDismiss() {
    if (typeof onDismiss === 'function') {
      onDismiss()
    }
  }

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={[
        RATE_BUTTON_HEIGHT + HEADER_HEIGHT,
        screenHeight - SHEET_TOP_MARGIN
      ]}
      initialSnap={0}
      callbackNode={bottomSheetY}
      renderHeader={() => (
        <View style={styles.header}>
          <View style={styles.headerDragIndicator} />
        </View>
      )}
      renderContent={() => (
        <View style={[styles.root, { minHeight }]}>
          <Animated.View
            style={[styles.content, { minHeight, opacity: contentOpacity }]}
          >
            {isSubmitted ? (
              <EventFeedbackSuccess />
            ) : (
              <EventFeedbackForm
                onSubmit={handleSubmit}
                onDismiss={handleDismiss}
                title={eventTitle}
              />
            )}
          </Animated.View>
          <Animated.View
            style={[styles.rateButton, { opacity: rateButtonOpacity }]}
          >
            <EventFeedbackRateButton onPress={handleRateButtonPress} />
          </Animated.View>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.blue
  },
  rateButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: RATE_BUTTON_HEIGHT
  },
  header: {
    height: HEADER_HEIGHT,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',

    backgroundColor: colors.blue
  },
  headerDragIndicator: {
    width: 40,
    height: DRAG_INDICATOR_HEIGHT,
    borderRadius: 5,
    backgroundColor: colors.white,
    opacity: 0.65
  },
  content: {
    paddingHorizontal: 24
  }
})

export default React.memo(EventFeedbackSheet)