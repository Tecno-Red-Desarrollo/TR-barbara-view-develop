import { Channel } from "./Channels.enum";
import { Route } from "./Routes.enum";

export class ChannelHelper {
  private static redirections = new Map([
    [ Channel.CANAL_0, Route.ZURICH_STARTING_POINT_PRODUCTOR ],
    [ Channel.CANAL_3, Route.ZURICH_CONSIDERATIONS ],
    [ Channel.CANAL_4, Route.ZURICH_CONSIDERATIONS]
  ]);

  public static setRoute(channel: number, esAsegurado: boolean): string {
    return !esAsegurado ? this.redirections.get(channel)! : Route.ZURICH_CONSIDERATIONS;
  }
}
