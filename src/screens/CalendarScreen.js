import React, {useContext, useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Svg, {Rect, Text as SvgText} from 'react-native-svg';
import {ScheduleContext} from '../context/ScheduleContext';

const CalendarScreen = () => {
  const {schedules} = useContext(ScheduleContext);
  const [markedDates, setMarkedDates] = useState({});
  const [renderBars, setRenderBars] = useState([]);

  useEffect(() => {
    let marks = {};
    let bars = [];

    schedules.forEach((schedule, index) => {
      if (schedule.type === 'Rental') {
        let currentDate = new Date(schedule.pickupDate);
        const returnDate = new Date(schedule.returnDate);

        while (currentDate <= returnDate) {
          const formattedDate = currentDate.toISOString().split('T')[0];
          marks[formattedDate] = {marked: true};

          // Store the first day for text rendering
          if (formattedDate === schedule.pickupDate) {
            bars.push({
              id: index,
              start: formattedDate,
              end: schedule.returnDate,
              gown: schedule.gown,
            });
          }

          currentDate.setDate(currentDate.getDate() + 1);
        }
      }
    });

    setMarkedDates(marks);
    setRenderBars(bars);
  }, [schedules]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📅 Calendar View</Text>
      <View>
        <Calendar
          markingType="custom"
          markedDates={markedDates}
          theme={{
            todayTextColor: 'blue',
            arrowColor: '#FF5722',
          }}
        />
        <Svg height="200" width="100%">
          {renderBars.map((bar, i) => (
            <React.Fragment key={bar.id}>
              <Rect
                x="5%"
                y={30 * i + 10}
                width="90%"
                height="25"
                fill="orange"
                rx="5"
              />
              <SvgText
                x="50%"
                y={30 * i + 27}
                fontSize="14"
                fontWeight="bold"
                fill="black"
                textAnchor="middle">
                {bar.gown}
              </SvgText>
            </React.Fragment>
          ))}
        </Svg>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default CalendarScreen;
