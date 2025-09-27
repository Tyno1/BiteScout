import "@testing-library/jest-dom";

// Polyfill TextEncoder/TextDecoder for JSDOM
import { TextDecoder, TextEncoder } from "node:util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
