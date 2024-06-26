import { Repository } from "typeorm";
import { BaseGuildRepository } from "./BaseGuildRepository.js";
import { dataSource } from "./dataSource.js";
import { PingableRole } from "./entities/PingableRole.js";

export class GuildPingableRoles extends BaseGuildRepository {
  private pingableRoles: Repository<PingableRole>;

  constructor(guildId) {
    super(guildId);
    this.pingableRoles = dataSource.getRepository(PingableRole);
  }

  async all(): Promise<PingableRole[]> {
    return this.pingableRoles.find({
      where: {
        guild_id: this.guildId,
      },
    });
  }

  async getForChannel(channelId: string): Promise<PingableRole[]> {
    return this.pingableRoles.find({
      where: {
        guild_id: this.guildId,
        channel_id: channelId,
      },
    });
  }

  async getByChannelAndRoleId(channelId: string, roleId: string): Promise<PingableRole | null> {
    return this.pingableRoles.findOne({
      where: {
        guild_id: this.guildId,
        channel_id: channelId,
        role_id: roleId,
      },
    });
  }

  async delete(channelId: string, roleId: string) {
    await this.pingableRoles.delete({
      guild_id: this.guildId,
      channel_id: channelId,
      role_id: roleId,
    });
  }

  async add(channelId: string, roleId: string) {
    await this.pingableRoles.insert({
      guild_id: this.guildId,
      channel_id: channelId,
      role_id: roleId,
    });
  }
}
