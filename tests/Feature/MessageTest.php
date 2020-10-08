<?php

namespace Tests\Feature;

use App\Room;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class MessageTest extends TestCase
{
    use RefreshDatabase;
    /** @test */
    public function a_member_can_send_a_message()
    {
        $this->withoutExceptionHandling();

        $me = $this->signIn();
        $room = factory(Room::class)->create();

        $roomOwner = User::find($room->user_id);

        $roomOwner->inviteMember($me,$room);

        $this->assertTrue($room->members->contains($me));

        $attr = [
            'message' => 'hello world'
        ];

        $this->actingAs($me)->json('POST', "/api/rooms/{$room->id}/messages", $attr)->assertStatus(200);

        $this->assertDatabaseHas('messages', $attr);
    }

    /** @test */

    public function a_non_member_cannot_add_a_message()
    {
        $this->withoutExceptionHandling();
        $owner = $this->signIn();

        $room = $owner->addRoom('new_room');

        $user = factory(User::class)->create();

        $attr = [
            'message' => 'hello world'
        ];

        $this->actingAs($user)->json('POST', "/api/rooms/{$room->id}/messages", $attr)
            ->assertStatus(401);
    }

    /** @test */
    public function a_message_field_is_required()
    {
        $this->withoutExceptionHandling();
        $user = $this->signIn();
        $room = $user->addRoom('new room');
        $this->json('POST', "/api/rooms/{$room->id}/messages", [])->assertStatus(401);

        $this->assertDatabaseCount('messages', 0);
    }

    /** @test */
    public function an_owner_can_see_all_room_messages()
    {
        $this->withoutExceptionHandling();

        $owner = $this->signIn();
        $room = $owner->addRoom('new room');
        $user = factory(User::class)->create();
        $owner->inviteMember($user,$room);

        $this->json('POST', "/api/rooms/{$room->id}/messages", ['message' => 'hello world']);

        $response = $this->actingAs($owner)->json('GET', "/api/rooms/{$room->id}/messages")
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    [
                        'message' => 'hello world',
                    ]
                ]
            ]);
    }

    /** @test */
    public function a_member_can_see_all_room_messages()
    {
        $this->withoutExceptionHandling();

        $owner = $this->signIn();
        $room = $owner->addRoom('new room');
        $user = factory(User::class)->create();
        $owner->inviteMember($user,$room);

        $this->json('POST', "/api/rooms/{$room->id}/messages", ['message' => 'hello world']);

        $this->actingAs($user)->json('GET', "/api/rooms/{$room->id}/messages")
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    [
                        'message' => 'hello world',
                    ]
                ]
            ]);

    }

    /** @test */
    public function a_non_member_cannot_see_any_messages()
    {
        $this->withoutExceptionHandling();

        $owner = $this->signIn();
        $room = $owner->addRoom('new room');
        $user = factory(User::class)->create();

        $this->json('POST', "/api/rooms/{$room->id}/messages", ['message' => 'hello world']);

        $this->actingAs($user)->json('GET', "/api/rooms/{$room->id}/messages")
            ->assertStatus(401);

    }
}
