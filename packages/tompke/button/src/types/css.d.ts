declare module '*.css' {
  const styles: import('lit').CSSResult;

  export default styles;
}

declare module '*.css?inline' {
  const styles: import('lit').CSSResult;

  export default styles;
}

/// <reference types="vite/client" />
