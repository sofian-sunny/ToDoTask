import * as React from 'react';
import * as Progress from 'react-native-progress';
import {Block, Button, Checkbox, Image, Text} from '../components';
import {FONTS, width} from '../constants/theme';
import {useTheme} from '../hooks';
import {MainRoutes} from '../navigation/StackNavigation';
import {useSelector} from 'react-redux';
import {NavigationProp} from '@react-navigation/native';
import {Pressable} from 'react-native';
import moment from 'moment';
import {ScrollView} from 'react-native-gesture-handler';

interface HomeScreenProps {
  navigation: NavigationProp<any>;
}

const HomeScreen = ({navigation}: HomeScreenProps) => {
  const {colors, gradients, icons, sizes} = useTheme();
  console.log('sizes.padding', sizes.padding);
  const todos = useSelector((state: any) => state);
  console.log('todos', todos);

  const renderFloatingBtn = (navigation: NavigationProp<any>) => {
    return (
      <Button
        onPress={() => navigation.navigate(MainRoutes.CreateTaskScreen)}
        position="absolute"
        right={10}
        bottom={30}
        style={{zIndex: 10}}
        width={70}
        height={70}
        radius={35}
        justify="center"
        align="center"
        gradient={gradients.primary}>
        <Image
          tintColor={colors.white}
          height={24}
          width={24}
          source={icons.plus}
        />
      </Button>
    );
  };
  console.log('todos =============', todos?.todos?.todos);
  const renderTask = () => {
    if (!todos?.todos?.todos || todos?.todos?.todos?.length === 0) {
      return null;
    }
    return (
      Array.isArray(todos?.todos?.todos) &&
      todos?.todos?.todos?.map((todoItem: any, index: number) => {
        let gradient = gradients.gold_white;
        if (todoItem.priority === 'Low') {
          gradient = gradients.primary_white;
        } else if (todoItem.priority === 'Medium') {
          gradient = gradients.lightblue_white;
        }
        return (
          <Pressable
            onPress={() =>
              navigation.navigate(MainRoutes.EditTaskScreen, {task: todoItem})
            }>
            <Block
              flex={0}
              row
              marginTop={sizes.sm}
              radius={sizes.cardRadius}
              align="center"
              color={colors.card}>
              <Block
                flex={0}
                style={{
                  borderTopLeftRadius: sizes.cardRadius,
                  borderBottomLeftRadius: sizes.cardRadius,
                }}
                height={80}
                width={15}
                gradient={gradient}
              />
              <Block padding={sizes.cardPadding} justify="center">
                <Text white h6>
                  {`${todoItem.title}`}
                </Text>
                <Block align="center" flex={0} row marginTop={10}>
                  <Image
                    tintColor={colors.white}
                    height={24}
                    width={24}
                    source={icons.calendar}
                  />
                  <Text opacity={0.8} white p marginLeft={10}>
                    {`${moment(todoItem.date).format('DD MMM')}`}
                  </Text>
                </Block>
              </Block>
              <Checkbox margin={sizes.cardPadding} />
            </Block>
          </Pressable>
        );
      })
    );
  };

  return (
    <Block safe color={colors.background}>
      {renderFloatingBtn(navigation)}
      <Block margin={sizes.padding}>
        <Block row align="center" flex={0} justify="space-between">
          <Block>
            <Text white h1>
              {`You have got 5 tasks today to complete `}
              <Image height={24} width={24} source={icons.edit} />
            </Text>
          </Block>
          <Block
            flex={0}
            width={50}
            height={50}
            radius={25}
            justify="center"
            align="center"
            gradient={gradients.primary}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}>
            <Image avatar source={icons.profile} />
          </Block>
        </Block>
        <Block
          marginTop={30}
          row
          align="center"
          flex={0}
          justify="space-between">
          <Text white h3 style={{letterSpacing: -0.5}}>
            Progress
          </Text>
          <Text white h6 color={colors.primary}>
            See All
          </Text>
        </Block>
        <Block
          flex={0}
          marginTop={sizes.sm}
          padding={sizes.cardPadding}
          radius={sizes.cardRadius}
          color={colors.card}>
          <Text white h5>
            Progress
          </Text>
          <Text opacity={0.8} marginTop={10} white h6>
            2/3 Task Completed
          </Text>
          <Block
            marginTop={10}
            row
            align="center"
            flex={0}
            justify="space-between">
            <Text opacity={0.8} white p font={FONTS.thin}>
              You are almost done go ahead
            </Text>
            <Text white h5>
              66%
            </Text>
          </Block>
          <Progress.Bar
            color={colors.primary}
            unfilledColor={'rgba(186, 131, 222, 0.4)'}
            style={{marginTop: 10, borderRadius: 10}}
            height={18}
            borderWidth={0}
            progress={0.3}
            width={width - 40 - 32}
          />
        </Block>
        <Block
          marginTop={30}
          row
          align="center"
          flex={0}
          justify="space-between">
          <Text white h3>
            Progress
          </Text>
          <Text white h6 color={colors.primary}>
            See All
          </Text>
        </Block>
        {Array.isArray(todos?.todos?.todos) && (
          <ScrollView>{renderTask()}</ScrollView>
        )}
      </Block>
    </Block>
  );
};
export default HomeScreen;
