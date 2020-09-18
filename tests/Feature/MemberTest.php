<?php

namespace Tests\Feature;

use App\Room;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class MemberTest extends TestCase
{
    use RefreshDatabase;


    /** @test */

    public function the_owner_is_added_as_a_participant_in_his_room()
    {
        $this->withoutExceptionHandling();
        $user = $this->signIn();
        $attr = [
            'name' => 'room',
            'type' => '0',
            'user_id' => $user->id,
        ];
        $this->json('POST','/rooms', $attr)
            ->assertStatus(201)
            ->assertJson(['success' => true]);

        $this->assertDatabaseHas('rooms', $attr);
        $this->assertDatabaseHas('room_user',['user_id' => $user->id]);
    }

    /** @test */

    public function an_owner_can_add_participants_to_his_room()
    {
        $this->withoutExceptionHandling();
        $user = $this->signIn();
        $anotherUser = factory(User::class)->create();
        $room = factory(Room::class)->create(['user_id'=> $user->id]);
        $this->json('POST', "/rooms/{$room->id}/users/{$anotherUser->id}")
            ->assertStatus(200)
            ->assertJson(['success' => true]);
        $this->assertDatabaseHas('room_user', ['user_id' => $anotherUser->id, 'room_id' => $room->id]);
    }

    /** @test */
    public function an_owner_cannot_add_an_already_exist_member()
    {
        $this->withoutExceptionHandling();

        $user = $this->signIn();

        $anotherUser = factory(User::class)->create();

        $room = factory(Room::class)->create(['user_id'=> $user->id]);

        $this->json('POST', "/rooms/{$room->id}/users/{$anotherUser->id}")
            ->assertStatus(200)
            ->assertJson(['success' => true]);

        $this->assertDatabaseHas('room_user', ['user_id' => $anotherUser->id, 'room_id' => $room->id]);

        // add the same user another time!

        $this->json('POST', "/rooms/{$room->id}/users/{$anotherUser->id}")
            ->assertStatus(401);

        $this->assertDatabaseCount('room_user',1);
    }

    /** @test */

    public function  an_owner_cannot_add_him_self_as_a_member()
    {
        $this->withoutExceptionHandling();
        $user = $this->signIn();
        $room = factory(Room::class)->create(['user_id' => $user->id]);


        $this->json('POST', "/rooms/{$room->id}/users/{$user->id}")
            ->assertStatus(401);

        $this->assertDatabaseMissing('room_user', ['user_id' => $user->id]);

    }

}
