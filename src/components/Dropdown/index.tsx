import React from 'react';
import SelectDropdown, { SelectDropdownProps } from 'react-native-select-dropdown';
import { Text, View } from 'react-native';

interface DropdownProps<T extends object> extends Omit<SelectDropdownProps, 'renderItem' | 'renderButton' | 'data' | 'defaultValue'> {
    data: T[];
    labelField: keyof T;
    valueField: keyof T;
    defaultValue?: T[keyof T];
    renderItem?: (item: T, index: number, isSelected: boolean) => React.ReactNode;
    renderButton?: (selectedItem: T | null, isOpened: boolean) => React.ReactNode;
}

const Dropdown = <T extends object>({
    data,
    labelField,
    valueField,
    defaultValue,
    renderItem,
    renderButton,
    ...rest
}: DropdownProps<T>) => {
    // Find the object in the data array that matches the defaultValue
    const selectedDefaultValue = data.find(item => item[valueField] === defaultValue) || null;

    const defaultRenderItem = (item: T, index: number, isSelected: boolean) => (
        <View style={{ padding: 10 }}>
            <Text>{String(item[labelField])}</Text>
        </View>
    );

    const defaultRenderButton = (selectedItem: T | null, isOpened: boolean) => (
        <View style={{ padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }}>
            <Text>{selectedItem ? String(selectedItem[labelField]) : 'Select an option'}</Text>
        </View>
    );

    return (
        <SelectDropdown
            data={data}
            defaultValue={selectedDefaultValue}
            renderItem={renderItem || defaultRenderItem}
            renderButton={renderButton || defaultRenderButton}
            {...rest}
        />
    );
};

export default Dropdown;
