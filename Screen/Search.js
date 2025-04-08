import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import InputByNam from '../comp/InputByNam'

const Search = () => {
  return (
    <ImageBackground style={{flex:1,padding:10}} source={require('../img/backgroudnen.png')}>
        <InputByNam/>
    </ImageBackground>
  )
}

export default Search

const styles = StyleSheet.create({})