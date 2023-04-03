export const EFFECT_KEYFRAME = [
  {
    filter: 'blur(100px)',
    transform: 'scale(1.15)',
    transformOrigin: 'center',
    opacity: 0
  },
  {
    filter: 'none',
    transform: 'none',
    transformOrigin: 'center',
    opacity: 1
  }
];

export const EFFECT_OPTIONS = {
  delay: 0,
  duration: 600,
  fill: "forwards",
  easing: 'cubic-bezier(0,.99,.32,.99)',
};
