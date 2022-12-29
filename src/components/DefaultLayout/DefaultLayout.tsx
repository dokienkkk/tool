import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import type {FC, PropsWithChildren, ReactElement} from 'react';
import React from 'react';
import Colors from '../../styles/Colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackButton from '../../icons/BackButton';
import type {DefaultTFuncReturn} from 'i18next';
import shareStyles from '../../styles';
import EditIcon from '../../icons/EditIcon';

interface DefaultLayoutProps {
  title?: string | DefaultTFuncReturn;

  edit?: boolean;

  onEdit?: () => void;

  left?: boolean;

  right?: ReactElement[] | ReactElement;

  goBack?: () => void;

  onPressIconRight?: () => void;
}

const {width, height} = Dimensions.get('screen');

const DefaultLayout: FC<PropsWithChildren<DefaultLayoutProps>> = (
  props: PropsWithChildren<DefaultLayoutProps>,
) => {
  const {left, right, children, goBack, onPressIconRight, title, edit, onEdit} =
    props;

  const rightChilds = React.Children.toArray(right);

  if (rightChilds.length > 2) {
    throw new Error(
      'One header side can not contain more than 2 icon elements',
    );
  }
  return (
    <View style={styles.bgWhite}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          {left && (
            <TouchableOpacity onPress={goBack}>
              <BackButton color={Colors.white} />
            </TouchableOpacity>
          )}

          {edit ? (
            <>
              <TouchableOpacity onPress={onEdit} style={styles.flexRow}>
                <Text style={[styles.title, shareStyles.textBold]}>
                  {title}
                </Text>
                <View style={styles.editIcon}>
                  <EditIcon />
                </View>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={[styles.title, shareStyles.textBold]}>{title}</Text>
          )}

          {right && onPressIconRight ? (
            <TouchableOpacity
              onPress={onPressIconRight}
              style={styles.headerRight}>
              {right}
            </TouchableOpacity>
          ) : (
            <View style={styles.headerRight}>{right}</View>
          )}
        </View>
        <View style={styles.body}>{children}</View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  bgWhite: {
    backgroundColor: Colors.white,
  },
  container: {
    width,
    height,
  },
  header: {
    backgroundColor: Colors.blue,
    height: 80,
    paddingLeft: 20,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: Colors.white,
    marginLeft: 30,
  },
  headerRight: {
    paddingRight: 20,
    marginLeft: 'auto',
  },
  body: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editIcon: {
    marginLeft: 8,
    marginTop: 4,
  },
});

export default DefaultLayout;
