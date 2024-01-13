# utopia

Post only human messages to another channel.

## Requirements

- Slack with paid plan
- Slack CLI

## Usage

1. Setup

    ```bash
    git clone https://github.com/Doarakko/utopia
    cd utopia
    ```

1. Enter the source and destination channel ids.

   `triggers/triggers.ts`: source channel

   ```ts
    channel_ids: ["CXXXX", "CAAAA"],
   ```

   `functions/functions.ts`

   ```ts
    function getPostChannelId(channel_id: string): string {
        switch (channel_id) {
            case "CXXXX":
                return "CYYYY";
            case "CAAAA":
                return "CBBBB";
            default:
                throw new Error(`Unknown channel_id: ${channel_id}`);
        }
    }
   ```

1. Deploy

   ```bash
   slack deploy
   slack trigger create
   ```

   When updating the trigger, run the following command.

   ```bash
   slack trigger update --trigger-id=yyyy
   ```

1. Invite the bot to source and destination channels

## Hints

### Run on local

```bash
slack run
slack trigger create
```
