import { Dimensions, Platform, StyleSheet, View } from 'react-native';
import { Dropdown } from '~/components/react-native-element-dropdown';
import React from 'react';
import { config } from '~/config/config';
import TabIndicator from '~/components/TabIndicator';
import { Category } from '~/api/endpoints';
import { t } from '~/providers/TranslationProvider';

export interface FilterSelectionProps {
  categories: Category[];
  selectedCategory?: number;
  onCategorySelect?: (category?: number) => void;
  selectedTab: number;
  onTabSelect: (tab: number) => void;
}

const HeaderComponent = ({
  categories,
  selectedCategory,
  onCategorySelect,
  selectedTab,
  onTabSelect,
}: FilterSelectionProps) => {
  const data = React.useMemo(() => {
    const map = categories.map(c => ({
      label: c.name,
      value: c.id.toString(),
    }));
    map.splice(0, 0, {
      label: t('explore.viewAll'),
      value: '',
    });
    return map;
  }, [categories]);

  const fontName = React.useMemo(() => {
    return config.defaultFont.ios
      ? Platform.select({
          ios: config.defaultFont.ios,
          android: config.defaultFont.android as unknown as string,
        })
      : undefined;
  }, []);

  return (
    <View>
      <View style={{ height: 50 }}>
        <Dropdown
          accessibilityLabel={
            (selectedCategory
              ? selectedCategory + '; '
              : t('explore.viewAll') + '; ') + t('accessibility.dropdownMenu')
          }
          fontFamily={fontName}
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          itemTextStyle={styles.selectedTextStyle}
          itemContainerStyle={{
            borderColor: config.color.misc.border,
          }}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          containerStyle={{
            borderColor: config.color.neutral[900],
          }}
          activeColor={config.color.misc.selected}
          data={data}
          maxHeight={Dimensions.get('window').height * 0.75}
          labelField="label"
          valueField="value"
          placeholder={t('explore.viewAll')}
          value={selectedCategory ? selectedCategory.toString() : ''}
          onChange={item => {
            if (onCategorySelect)
              onCategorySelect(
                item.value === '' ? undefined : Number.parseInt(item.value, 10),
              );
          }}
        />
      </View>
      <View style={{ height: 55 }}>
        <TabIndicator
          tabs={[t('explore.newest'), t('explore.popular')]}
          style={styles.pagerTabIndicatorRow}
          selected={selectedTab}
          selectedBackgroundColor={config.color.neutral[700]}
          onTabSwitch={onTabSelect}
        />
      </View>
    </View>
  );
};

export default React.memo(HeaderComponent);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: config.color.neutral[900],
    borderWidth: 0.5,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: config.color.neutral[900],
  },
  selectedTextStyle: {
    fontSize: 16,
    color: config.color.neutral[900],
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  pagerTabIndicatorRow: {
    marginVertical: 20,
  },
});
