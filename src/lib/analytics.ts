import { sendGTMEvent } from '@next/third-parties/google';

export function trackOutboundClick(linkText: string, linkUrl: string) {
  sendGTMEvent({
    event: 'outbound_click',
    link_text: linkText,
    link_url: linkUrl,
  });
}
