import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native'

export const Container = styled(TouchableOpacity)`
    width: 95%;
    margin-left: 10px;
    margin-top: 10px;
    padding: ${RFValue(6)}px;
    background-color: ${({ theme }) => theme.colors.text};
    border-radius: ${RFValue(10)}px;
    margin-bottom: 8px;
    padding: ${RFValue(10)}px;
`

export const TextTitle = styled.Text`
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${RFValue(26)}px;
    font-weight: bold;
    flex-direction: row;
`

export const TextCard = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(20)}px;
    font-weight: bold;
    flex-direction: row;
`
