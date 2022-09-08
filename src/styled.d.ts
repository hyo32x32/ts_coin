import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    coinBgColor: string;
    bgColor: string;
    accentColor: string;
  }
}
