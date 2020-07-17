/* eslint-disable max-len */
import React from 'react'

const HoneySvg = (props: any): React.ReactElement => (
  <svg viewBox="0 0 26 28" {...props}>
    <defs>
      <path
        id="prefix__a"
        d="M9.927 6.29c.045-1.12.283-2.602 1.011-3.479 1.026-1.225 3.106-1.028 3.448.74.163.864-.06 1.922-.446 2.664-.817 1.618-2.333 2.95-4.043 3.403.015-1.013.001-2.33.03-3.328m13.94 15.642c-.862 1.014-1.961 1.8-3.017 1.755-1.189-.045-1.07-1.543-1.07-2.39v-3.555c.015-.68.015-1.361-.06-2.027-.192-1.982-1.337-3.57-3.492-3.722-3.744-.151-5.23 3.525-6.33 6.55v-6.625c3.27-.514 7.802-2.375 7.936-6.61.223-7.202-11.74-7.459-11.696 1.603.015.696.015 2.027.015 2.723C4.548 9.39 3.255 7 2.66 5.579a.388.388 0 00-.475-.242c-2.244.59-2.57 2.996-1.055 4.63 1.248 1.346 3.24 1.86 4.993 1.95-.014 5.25-.014 8.488-.014 13.721.074.742 1.07.939 1.65.953.653.016 1.871-.18 1.93-1.043.21-2.572 2.363-10.166 5.291-10.166.684 0 1.01.454 1.01 1.12v6.187c0 2.571 1.428 4.296 4.028 4.311 2.304 0 4.325-1.936 5.335-4.16.312-.71-1.025-1.438-1.486-.908"
      />
    </defs>
    <g fill="none" fillRule="evenodd">
      <mask id="prefix__b" fill="#fff">
        <use xlinkHref="#prefix__a" />
      </mask>
      <use fill="#FFF" xlinkHref="#prefix__a" />
      <g fill="#FF7E27" mask="url(#prefix__b)">
        <path d="M0 0h25v28H0z" />
      </g>
    </g>
  </svg>
)

export default HoneySvg