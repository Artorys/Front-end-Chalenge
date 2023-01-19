import 'styled-components';
import { IThemeType, ThemeType } from '../types/Theme';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {
    
  }
}